// Update with your config settings.

require('babel-register');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('Please set DATABASE_URL in your NODE_ENV');
}

module.exports = {

  client: 'pg',
  connection: DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },

};
