const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProdUX API",
      version: "1.0.0",
      description: "API documentation for ProdUX",
    },
    servers: [
      {
        url: "https://krchisud2l.execute-api.ap-south-1.amazonaws.com/api/docs",
        description: "Local Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerOptions;
