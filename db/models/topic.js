'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    type: {
      type: Sequelize.STRING(20),
      allowNull: false
    }
  }, {});
  Topic.associate = function (models) {
    // associations can be defined here
  };
  return Topic;
};