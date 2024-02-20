'use strict';

const userService = require('../services/user.service');

const get = async(req, res) => {
  const allUsers = await userService.getAllUsers();

  res.send(allUsers);
};

const getOne = async(req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    res.status(404).send('user not found');

    return;
  }

  res.send(user);
};

const create = async(req, res) => {
  if (req.body.name === '' || !req.body.name) {
    res.status(400).send('name required!');

    return;
  }

  const newUser = await userService.createUser(req.body.name);

  res.status(201).send(newUser);
};

const remove = async(req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.removeUser(req.params.id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  if (!req.params.id) {
    res.status(400).send('id required!');
  }

  if (req.body.name === '') {
    res.status(400).send('name required!');
  }

  const user = await userService.getUserById(req.params.id);

  if (!user) {
    res.status(404).send('user not found');

    return;
  }

  await userService.updateUser(req.params.id, req.body.name);

  const updatedUser = await userService.getUserById(req.params.id);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
