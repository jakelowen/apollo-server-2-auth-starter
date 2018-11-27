// Update with your config settings.
require('dotenv').config();
const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  test: {
    client: 'postgres',
    connection: process.env.DATABASE_URL_TESTING,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },

  development: {
    client: 'postgres',
    connection: process.env.DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
