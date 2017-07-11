const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongDB server");
  }
console.log("Connected to MongoDB server");

// db.collection("Todos").deleteMany({text: "eat lunch"}).then((result) => {
// console.log(result);
// }, (err) => {
//   console.log("Unable to delete", err);
// });


// db.collection("Todos").deleteOne({text: "eat lunch"}).then((result) => {
// console.log(result);
// }, (err) => {
//
// });

//
// db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
// console.log(result);
// }, (err) => {
//
// });

// db.collection("Users").deleteMany({name: "Przemek"}).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log(err);
// });

db.collection("Users").findOneAndDelete({
  _id: new ObjectID("59636da3503a4c25d483f1b0")}).then((result) => {
  console.log(result);
}, (err) => {
  console.log(err);
});



//db.close();


});
