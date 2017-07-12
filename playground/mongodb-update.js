const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongDB server");
  }
console.log("Connected to MongoDB server");

// db.collection("Todos").findOneAndUpdate({
//   _id: new ObjectID("5963bec97a29861231a080ec")
// }, {
// $set: {
//   completed: true
// }
// }, {
//   returnOriginal: false
// }).then((result) => {
//   console.log(JSON.stringify(result, undefined,2));
// });

db.collection("Users").findOneAndUpdate({
  _id: new ObjectID("5965e7d1251d0a2503d13013")
}, {
$set: {
  name: "Przemek"
},
$inc: {
  age: 1
}
},
{
returnOriginal: false
}).then((result) => {
  console.log(JSON.stringify(result, undefined,2));
})



//db.close();


});
