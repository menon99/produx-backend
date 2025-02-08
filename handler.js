const serverless = require("serverless-http");
const express = require("express");
const authRoutes = require("./src/routes/authRouter");
const workshopRoutes = require("./src/routes/workshopRoutes");
require("./db");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/workshop", workshopRoutes);

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
