'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
    defaultScope:{
      attributes:{
        exclude: ['password']
      }
    }
  });
  user.associate = function(models) {
    user.hasMany(models.articles, {
      foreignKey: 'user_id'
    })
  };
  return user;
};