const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongDB server");
  }
console.log("Connected to MongoDB server");

// db.collection("Todos").find({
//   _id: new ObjectID("596377797a29861231a0792d")}).toArray().then((docs) => {
// console.log("Todos");
// console.log(JSON.stringify(docs, undefined, 2));
// }, (err) => {
//   console.log("Unable to fetch Todos", err);
// });

// db.collection("Todos").find().count().then((count) => {
// console.log("Todos count: " + count);
//
// }, (err) => {
//   console.log("Unable to fetch Todos", err);
// });

db.collection("Users").find({name: "Przemek"}).toArray().then((users) => {
console.log("Users list:");
console.log(JSON.stringify(users, undefined,2));
}, (err) => {
  console.log("Unable to fetch data.")
});


//db.close();


});
