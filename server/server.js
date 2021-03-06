require("./config/config");

const _ = require("lodash");
var express = require("express");
var bodyParser = require('body-parser');
const ObjectID = require("mongodb").ObjectID;

var mongoose = require("./db/mongoose").mongoose;
var Todo = require("./models/todo").Todo;
var User = require("./models/user").User;

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
});

todo.save().then((doc) => {
  res.send(doc);
}, (e) => {
  res.status(400).send(e);
});

});

app.get("/", (req, res) => {
res.send("Hello World");
}, (e) => {
    res.status(400).send(e);
  });



app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
  res.send({todos})
}, (e) => {
    res.status(400).send(e);
  })
});

app.get("/todos/:id", (req, res) => {
 var id = req.params.id;

if(!ObjectID.isValid(id)) {
return res.status(404).send();

}

  Todo.findById(id).then((todo) => {
    if(!todo) {
    res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });

});

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
//return because we want to stop execution of the function
  return res.status(404).send();

  }

Todo.findByIdAndRemove(id).then((todo) => {
if(!todo) {
  res.status(404).send();
}

res.send({todo});

}).catch((e) => {
  res.status(400).send(e);
});


});


app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
if(!ObjectID.isValid(id)) {
  return res.status(404).send();
}

if(_.isBoolean(body.completed) && body.completed) {
  body.completedAt = new Date().getTime();
} else {
  body.completed = false;
  body.completedAt = null;
}

Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
  if(!todo) {
    return res.status(404).send();
  }
res.send({todo: todo});

}).catch((e) => {
res.status(400).send();
})
});


app.post("/users", (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

user.save().then(() => {
  return user.generateAuthToken();
}).then((token) => {
  res.header('x-auth', token).send(user);
}).catch((e) => {
  res.status(400).send(e);
});


});


app.listen(port, () => {
  console.log("Started at port " + port);
});



module.exports = {
  app: app
}
