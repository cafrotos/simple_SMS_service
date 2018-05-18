'use strict';
module.exports = (sequelize, DataTypes) => {
  var smsdata = sequelize.define('smsdata', {
    shop: DataTypes.STRING,
    email: DataTypes.STRING,
    contents: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  smsdata.associate = function(models) {
    // associations can be defined here
  };
  return smsdata;
};