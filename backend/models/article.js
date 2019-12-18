'use strict';
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
    judul: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    tableName: "article",
    underscored: true,
  });
  articles.associate = function(models) {
    articles.belongsTo(models.user, {
      foreignKey: "user_id"
    })
  };
  return articles;
};