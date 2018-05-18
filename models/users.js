'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    shop: DataTypes.STRING,
    fullnames: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};