const serverless = require("serverless-http");
const express = require("express");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");

const authRoutes = require("./src/routes/authRouter");
const workshopRoutes = require("./src/routes/workshopRoutes");
const treasureHuntRoutes = require("./src/routes/treasureHuntRoutes");
const webinarRoutes = require("./src/routes/webinarRoutes");

require("./db");

// Initialise express app
const app = express();
app.use(express.json());

// Add swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/workshop", workshopRoutes);
app.use("/api/treasurehunt", treasureHuntRoutes);
app.use("/api/webinar", webinarRoutes);

// Add Health API
app.get("/health", (req, res) => {
  return res.status(200).send("AoK");
});

// Default not found route
app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
