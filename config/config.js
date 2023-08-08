require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT, DB_TEST_USERNAME, DB_TEST_PASSWORD, DB_TEST_NAME, DB_TEST_HOST, DB_TEST_DIALECT } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    // Use a different storage. Default: none
    seederStorage: 'json',
    // Use a different file name. Default: sequelize-data.json
    seederStoragePath: 'sequelize-data.json',

    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',
    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'sequelize-meta.json',
  },
  test: {
    username: DB_TEST_USERNAME,
    password: DB_TEST_PASSWORD,
    database: DB_TEST_NAME,
    host: DB_TEST_HOST,
    dialect: DB_TEST_DIALECT,
    // Use a different storage. Default: none
    seederStorage: 'json',
    // Use a different file name. Default: sequelize-data.json
    seederStoragePath: 'sequelize-data.json',

    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',
    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'sequelize-meta.json',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    // Use a different storage. Default: none
    seederStorage: 'json',
    // Use a different file name. Default: sequelize-data.json
    seederStoragePath: 'sequelize-data.json',

    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',
    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'sequelize-meta.json',
  },
};
