("use strict");

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class lab extends Model {
    static associate(models) {
      // define association here
      lab.hasMany(models.inventory, {
        foreignKey: "labId",
      });
      lab.hasMany(models.userlab, {
        foreignKey: "lab_id",
      });
    }
  }
  lab.init(
    {
      lab_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "lab",
    }
  );
  return lab;
};
