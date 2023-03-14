("use strict");

import { Model, Sequelize } from "sequelize";

export default (sequelize, DataTypes) => {
  class inventory extends Model {
    static associate(models) {
      // define association here
      inventory.belongsTo(models.lab, {
        foreignKey: "id",
        targetKey: "labId",
      });
    }
  }
  inventory.init(
    {
      inventory_name: DataTypes.STRING,
      inventory_images: DataTypes.ARRAY(DataTypes.STRING),
      labId: {
        Types: DataTypes.UUID,
        references: {
          model: "lab",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "inventory",
    }
  );
  return inventory;
};
