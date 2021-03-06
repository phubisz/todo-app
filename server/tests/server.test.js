const expect = require("expect");
const request = require("supertest");
const ObjectID = require("mongodb").ObjectID;

const app = require("./../server").app;
const Todo = require("./../models/todo").Todo;

const todos = [{
  _id: new ObjectID(),
  text: "First test todo"
}, {
  _id: new ObjectID(),
  text: "Second test todo",
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
  return Todo.insertMany(todos);
}).then(() => {
  done();
});
});

describe("POST /todos", () => {
  it("should create new todo", (done) => {
    var text = "Test todo text";

    request(app)
    .post("/todos")
    .send({text: text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
Todo.find({text}).then((todos) => {
  expect(todos.length).toBe(1);
  expect(todos[0].text).toBe(text);
  done();
}).catch((e) => {
  done(e);
});

    });
  });

it("Should not send any empty data", (done) => {

request(app)
.post("/todos")
.send({})
.expect(400)
.end((err, res) => {
  if (err) {
    return done(err);
  }

  Todo.find().then((todos) => {
    expect(todos.length).toBe(2);
    done();
  }).catch((e) => {
    done(e);
  });
});


});

});

describe("GET /todos", () => {
  it("Should get all todos", (done) => {
request(app)
.get("/todos")
.expect(200)
.expect((res) => {
  expect(res.body.todos.length).toBe(2);
})
.end(done);

  });
});

describe("GET /todos:id", () => {

it("should return todo doc", (done) => {
request(app)
.get("/todos/" + todos[0]._id.toHexString())
.expect(200)
.expect((res) => {
  expect(res.body.todo.text).toBe(todos[0].text);
})
.end(done);


});

it("Should return 404 if todo not found", (done) => {
var hexId = new ObjectID().toHexString();

request(app)
.get("/todos/" + hexId)
.expect(404)
.end(done);
});


it("Should return 404 if todo id is not valid", (done) => {
request(app)
.get("/todos/123")
.expect(404)
.end(done);
});
});

describe("DELETE /todos/:id", () => {
  it("Should remove todo", (done) => {
var hexId = todos[1]._id.toHexString();
request(app)
.delete("/todos/" + hexId)
.expect(200)
.expect((res) => {
  expect(res.body.todo._id).toBe(hexId);
})
.end((err, res) => {
  if(err) {
    return done(err);
  }

 Todo.findById(hexId).then((todo) => {
   expect(todo).toNotExist();
   done();
 }).catch((e) => done(e));

})
  });

it("should retur 404 if todo not found", (done) => {
  var hexId = new ObjectID().toHexString();
  request(app)
  .delete("/todos/" + hexId)
  .expect(404)
  .end(done);
});

it("should return 404 if object id is ivalid", (done) => {
  request(app)
  .delete("/todos/123")
  .expect(404)
  .end(done);
});

});

describe("PATCH /todos/:id", () => {
  it("Should update todo", (done) => {
var hexId = todos[0]._id.toHexString();
var text = "new something";
    request(app)
    .patch("/todos/" + hexId)
     .send({
       text: text,
       completed: true
     })
    .expect(200)
    .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA("number");
      })
  .end(done);
  });

  it("Should clear completedAt when todo is not completed", (done) => {
  var hexId = todos[1]._id.toHexString();
  var text = "new something";
  request(app)
  .patch("/todos/" + hexId)
  .send({
    text: text,
    completed: false
  })
  .expect(200)
  .expect((res) => {
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(false);
    expect(res.body.todo.completedAt).toNotExist();
  })
  .end(done);
  });

})
