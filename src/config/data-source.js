const { DataSource } = require("typeorm");
const ExternalDataEntity = require("../entities/external-data.entity");
const UserEntity = require("../entities/user.entity");

let appDataSource;

function createDatabaseOptions() {
  const dbPort = Number(process.env.DB_PORT || 5432);

  return {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: dbPort,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "external_data_db",
    synchronize: true,
    logging: false,
    entities: [ExternalDataEntity, UserEntity],
  };
}

function getDataSource() {
  if (!appDataSource) {
    appDataSource = new DataSource(createDatabaseOptions());
  }
  return appDataSource;
}

async function initializeDatabase() {
  const dataSource = getDataSource();

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
    console.log("Database connected");
  }

  return dataSource;
}

module.exports = {
  getDataSource,
  initializeDatabase,
};