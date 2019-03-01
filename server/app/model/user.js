'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    email: STRING(30),
    pass: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  User.findByMail = async function(email) {
    return await this.findOne({
      where: {
        email: email
      }
    });
  }

  User.findByName = async function(name) {
    return await this.findOne({
      where: {
        name: name
      }
    });
  }


  return User;
};