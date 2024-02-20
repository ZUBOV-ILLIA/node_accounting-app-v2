'use strict';

const { v4: uuidv4 } = require('uuid');
const { client } = require('./db.js');

// ===================== ===================== =====================
const getAllUsers = async() => {
  const result = await client.query(`
    SELECT * FROM users
  `);

  return result.rows;
};

const getUserById = async(id) => {
  const result = await client.query(`
    SELECT * FROM users
    WHERE id = $1
  `, [id]);

  return result.rows[0] || null;
};

const createUser = async(name) => {
  const id = uuidv4();

  await client.query(`
    INSERT INTO users (id, name)
    VALUES ($1, $2)
  `, [id, name]);

  const result = await await getUserById(id);

  return result;
};

const removeUser = async(id) => {
  await client.query(`
    DELETE FROM users
    WHERE id = $1
  `, [id]);
};

const updateUser = async(id, name) => {
  await client.query(`
    UPDATE users
    SET name = $1
    WHERE id = $2
  `, [name, id]);
};

const resetUsers = () => {
  // writeUsers([]);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  resetUsers,
};
