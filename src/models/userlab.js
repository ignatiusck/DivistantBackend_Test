"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class UserLab extends Model {
    static associate(models) {
      // define association here
      UserLab.hasMany(models.user, {
        foreignKey: "id",
      });
      UserLab.hasMany(models.lab, {
        foreignKey: "id",
      });
    }
  }
  UserLab.init(
    {
      user_id: DataTypes.UUID,
      lab_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "UserLab",
    }
  );
  return UserLab;
};
