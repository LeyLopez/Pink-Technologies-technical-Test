const express = require("express");
const swaggerUi = require("swagger-ui-express");
const authModule = require("./module/auth.module");
const externalDataModule = require("./module/external-data.module");
const { swaggerSpec } = require("./docs/swagger");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.redirect("/api-docs");
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/auth", authModule);
  app.use("/", externalDataModule);

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
}

module.exports = { createApp };