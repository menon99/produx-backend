require("dotenv").config();
const mongoose = require("mongoose");

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB;

const uri = `mongodb+srv://${username}:${password}@cluster0.ne5ud.mongodb.net/${dbName}/?retryWrites=true&w=majority`;
console.log(uri);

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
