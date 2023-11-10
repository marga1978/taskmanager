const { mongoose, Schema } = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    throw new Error(err);
  } 
}
connectDb()
