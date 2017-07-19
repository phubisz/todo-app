const ObjectID = require("mongodb").ObjectID;

const mongoose = require("./../server/db/mongoose").mongoose;
const Todo = require("./../server/models/todo").Todo;
var User = require("./../server/models/user").User;

var id = "596918938b58280320869df8";

if(!ObjectID.isValid(id)) {
  console.log("Id is not valid");
}


// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("Todos", todos);
// });
//
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("Todo", todo);
// });
//
//
// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log("ID not found");
//   }
//   console.log("Todo by id", todo);
// }).catch((e) => {
//   console.log(e);
// });


User.findById(id).then((user) => {
  if(!user) {
    return console.log("User does not exist");
  }
  console.log("user", user);
}).catch((e) => {
  console.log(e);
});
