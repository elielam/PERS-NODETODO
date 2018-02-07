'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    language: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.FLOAT,
    complete: DataTypes.INTEGER,
    isFav: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    CatId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Project;
};