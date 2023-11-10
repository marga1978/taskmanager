// CRUD create read update delete
const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const connectionURL = process.env.MONGODB_URL;
const client = new MongoClient(connectionURL);
// const id = new ObjectId()//genera in nuovo ObjectID
// console.log(id.id)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp()) //consente di sapere quando è stato generato

//Esempio
//ObjectId("00000020f51bb4362eee2a4d")
/*
    A four byte time stamp, 00000020
    A five byte random element, f51bb4362e
    A three byte counter, ee2a4d (contatore che parte da un valore casuale)
*/

// Database Name
const dbName = "task-manager";

async function main() {
  //try {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const users = db.collection("users");
  const tasks = db.collection("tasks");

  //torna un dato
  // const findResultOne = await users.findOne({
  //     _id: new ObjectId("6535281c58d983000714ec1b")
  // })
  // if (!findResultOne)
  //     throw new Error("not found!")
  //return console.log(findResultOne)

  //torna più dati
  const findResult = await users.find({age: 27,}).toArray();
  console.log(findResult);
  if (!findResult) throw new Error("not found multiple!");

  const findCountResult = await users.countDocuments({age: 27})
  console.log(findCountResult);
  if (!findCountResult) throw new Error("not found multiple!");

  const updateOneResult = await users.updateOne(
    {_id: new ObjectId("653521655d715fa41058335a")},
    {
        $set:{
            name:"marco update"
        },
        $inc:{
            age:1 //incrementa anno di 1
        }
    })
  console.log(updateOneResult);
  if (!updateOneResult) throw new Error("not updated!");

  const updateManyResult = await tasks.updateMany(
    {completed: false},
    {
        $set:{
            completed:true
        }
    })
  console.log(updateManyResult);
  if (!updateManyResult) throw new Error("not updated!");
  

  return "done";
  //console.log("quuiii")
  // const insertResultOne = await users.insertOne({
  //   _id:id,
  //     name: "Andrew",
  //   age: 27,
  // });
  // console.log("Inserted documents =>", insertResultOne);

  // const insertResultMany = await users.insertMany([
  //   {
  //     name: "Fabio",
  //     age: 46,
  //   },
  //   {
  //     name: "Marco",
  //     age: 44,
  //   },
  // ]);
  // console.log("Inserted documents many =>", insertResultMany);
  // //
  // const insertResultTask = await tasks.insertMany([
  //   {
  //     description: "task 1",
  //     completed: true,
  //   },
  //   {
  //     description: "task2",
  //     completed: false,
  //   },
  // ]);
  // console.log("Inserted documents many task =>", insertResultTask);
  // return "done.";
  //   } catch (err) {
  //     return err.message
  //   }
}

main()
  .then(console.log("search ok"))
  .catch(console.error)
  .finally(() => client.close());

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database!')
//     }

//     const db = client.db(databaseName)

//     db.collection('users').insertOne({
//         name: 'Andrew',
//         age: 27
//     })
// })
