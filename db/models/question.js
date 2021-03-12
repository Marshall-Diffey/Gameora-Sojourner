'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Question.associate = function (models) {
    // associations can be defined here
    Question.hasMany(models.Comment, { foreignKey: 'questionId', onDelete: 'CASCADE' });
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.belongsTo(models.Topic, { foreignKey: 'topicId' });
  };
  return Question;
};
