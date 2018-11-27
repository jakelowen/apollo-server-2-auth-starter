const environment = process.env.NODE_ENV || 'development';
const knexTinyLogger = require('knex-tiny-logger').default;
const config = require('../../knexfile')[environment];

// eslint-disable-next-line import/order
const db = require('knex')(config);

const { DEBUG } = process.env;
if (DEBUG) knexTinyLogger(db);

module.exports = db;
