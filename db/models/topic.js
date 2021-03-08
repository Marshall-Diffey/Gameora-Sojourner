'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {});
  Topic.associate = function (models) {
    // associations can be defined here
    Topic.hasMany(models.Question, { foreignKey: 'topicId' });

  };
  return Topic;
};