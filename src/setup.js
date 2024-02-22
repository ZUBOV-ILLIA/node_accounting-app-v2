'use strict';
/*
создаем таблицу в БД
https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
*/

const { User } = require('./services/user.service');

User.sync({ force: true });
