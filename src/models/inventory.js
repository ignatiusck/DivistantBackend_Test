("use strict");

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    static associate(models) {
      // define association here
      inventory.belongsTo(models.lab, {
        foreignKey: "id",
        sourceKey: "labId",
      });
    }
  }
  inventory.init(
    {
      inventory_name: DataTypes.STRING,
      inventory_images: DataTypes.STRING,
      labId: {
        type: DataTypes.UUID,
        references: {
          model: "lab",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "inventory",
      timestamps: false,
    }
  );
  return inventory;
};
