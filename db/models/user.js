'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Question, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  return User;
};
