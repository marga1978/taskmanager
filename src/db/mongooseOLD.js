const { mongoose, Schema } = require("mongoose");
var validator = require('validator');
//

async function saveUser() {
  const User = mongoose.model(
    "User",
    { name: { type: String, required:true, trim:true},
      age: {type: Number, default:0, validate(value){if (value<0) throw new Error("age must be more than 0 age")}},
      email:{type: String, required:true, trim:true,lowercase:true,validate(value){
        if(!validator.isEmail(value)) throw new Error('Email is invalid') //=> true
      }},
      password:{type:String, required:true, trim:true,minLength:7,validate(value){
        if (value.toLowerCase().includes("password")) throw new Error('Password cannot contain "password"')
      }}
      //completed:{type:Boolean}
    }
  );
  try {
    await mongoose.connect("mongodb://localhost:27017/task-manager");
    const userDoc = new User({ name:'Pippetta', age: -1 });
    const resUserDoc =  await userDoc.save();
    console.log("Obj inserito:",resUserDoc);
  } catch (err) {
    throw new Error(err);
  } finally {
    mongoose.connection.close()
  }
}
saveUser() 
