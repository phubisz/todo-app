const ObjectID = require("mongodb").ObjectID;

const mongoose = require("./../server/db/mongoose").mongoose;
const Todo = require("./../server/models/todo").Todo;
var User = require("./../server/models/user").User;


// //Todo.remove({})
// Todo.remove().then((result) => {
//   console.log(result);
// });


// Todo.findOneAndRemove()

//Todo.findByIdAndRemove

// Todo.findByIdAndRemove("597d940988a2ce7a8832bf6c").then((todo) => {
//   console.log(todo);
// });


Todo.findOneAndRemove({_id: "597d940988a2ce7a8832bf6c"}).then((todo) => {
  console.log(todo);
});
