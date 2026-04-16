const { DataSource } = require("typeorm");
const ExternalDataEntity = require("../entities/external-data.entity");
const UserEntity = require("../entities/user.entity");

let appDataSource;

function parseBoolean(value, defaultValue = false) {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  return ["true", "1", "yes", "on"].includes(String(value).toLowerCase());
}

function createSslOptions() {
  const sslEnabled = parseBoolean(process.env.DB_SSL, false);

  if (!sslEnabled) {
    return false;
  }

  return {
    require: true,
    rejectUnauthorized: parseBoolean(
      process.env.DB_SSL_REJECT_UNAUTHORIZED,
      false
    ),
  };
}

function createDatabaseOptions() {
  const databaseUrl = process.env.DATABASE_URL;
  const dbPort = Number(process.env.DB_PORT || 5432);

  const commonOptions = {
    type: "postgres",
    ssl: createSslOptions(),
    synchronize: true,
    logging: false,
    entities: [ExternalDataEntity, UserEntity],
  };

  if (databaseUrl) {
    return {
      ...commonOptions,
      url: databaseUrl,
    };
  }

  return {
    ...commonOptions,
    host: process.env.DB_HOST || "localhost",
    port: dbPort,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "external_data_db",
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