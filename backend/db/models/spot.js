"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define("Spot", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Spots',
    underscored: false
  });
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Spot;
};
