const serverless = require("serverless-http");
const express = require("express");
const authRoutes = require("./src/routes/authRouter");
require("./db");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res, next) => {
  return res.status(200).send("Hello World!");
});

app.get("/hello", (req, res, next) => {
  return res.status(200).send("New Route");
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
