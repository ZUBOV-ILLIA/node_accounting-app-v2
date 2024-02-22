'use strict';

// const { v4: uuidv4 } = require('uuid');
// const { client } = require('./db.js');
const { sequelize } = require('./db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: DataTypes.NOW,
  //   field: 'created_at',
  // },
  // updatedAt: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: DataTypes.NOW,
  //   field: 'updated_at',
  // },
}, {
  tableName: 'users',
  // createdAt: false,
  // updatedAt: false,
});

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};
// ===================== ===================== =====================
const getAllUsers = async() => {
  // const result = await client.query(`
  //   SELECT * FROM users
  // `);
  // return result.rows;

  const users = await User.findAll({
    order: ['name'],
  });

  return users;
};

const getUserById = async(id) => {
  // const result = await client.query(`
  //   SELECT * FROM users
  //   WHERE id = $1
  // `, [id]);

  // return result.rows[0] || null;

  const user = await User.findByPk(id);

  return user;
};

const createUser = async(name) => {
  // const id = uuidv4();

  // await client.query(`
  //   INSERT INTO users (id, name)
  //   VALUES ($1, $2)
  // `, [id, name]);

  // const result = await getUserById(id);

  // return result;
  return User.create({
    /*
      при создании объекта для id используется UUIDv4,
      который указан в модели User
    */
    name,
  });
};

const removeUser = async(id) => {
  // await client.query(`
  //   DELETE FROM users
  //   WHERE id = $1
  // `, [id]);

  // await User.destroy({ // sequelize первый вариант
  //   where: {
  //     id,
  //   },
  // });

  // sequelize вариант с заданием query вручную
  await sequelize.query(`
    DELETE FROM users
    WHERE id = '${id}'
  `);
};

const updateUser = async(id, name) => {
  // await client.query(`
  //   UPDATE users
  //   SET name = $1
  //   WHERE id = $2
  // `, [name, id]);

  await User.update({ name }, {
    where: {
      id,
    },
  });
};

const resetUsers = () => {
  // writeUsers([]);
};

module.exports = {
  User,
  normalize,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  resetUsers,
};
