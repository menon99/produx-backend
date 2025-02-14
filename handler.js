const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");

const authRoutes = require("./src/routes/authRouter");
const workshopRoutes = require("./src/routes/workshopRoutes");
const quizRoutes = require("./src/routes/quizRoutes");
const webinarRoutes = require("./src/routes/webinarRoutes");
const ventureClashRoutes = require("./src/routes/ventureClashRoutes");

require("./db");

// Allowed domains
const allowedOrigins = ["http://localhost:5173", "https://produx.bitesys.org"];

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and auth headers
};

// Initialise express app
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Add swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/workshop", workshopRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/webinar", webinarRoutes);
app.use("/api/ventureclash", ventureClashRoutes);

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
