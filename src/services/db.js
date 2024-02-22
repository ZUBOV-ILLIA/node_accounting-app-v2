/* eslint-disable no-console */
'use strict';

require('dotenv').config();

const { Client } = require('pg'); // IMPORT POSTGRES CONNECTION
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

// sequelize connection !!!
async function sequelizeConnect() {
  try {
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

sequelizeConnect();

//  POSTGRES CONNECTION !!!
const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  // port: 8456, // порт для доккер постгрес контейнера
});

// async function clientConnect() {
//   await client.connect();

//   // eslint-disable-next-line no-console
//   console.log(' >>> connected to database <<< ');
// }

// clientConnect();

module.exports = {
  client,
  sequelize,
};
