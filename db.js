require("dotenv").config();
const mongoose = require("mongoose");

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const dbName = process.env.MONGO_DB;

const uri = `mongodb+srv://${username}:${password}@cluster0.ne5ud.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
