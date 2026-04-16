require("dotenv").config();

const { createApp } = require("./app");
const { initializeDatabase } = require("./config/data-source");

async function bootstrap() {
  try {
    await initializeDatabase();

    const app = createApp();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

bootstrap();