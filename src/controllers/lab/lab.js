const crypto = require("crypto");
const { validationResult } = require("express-validator");

const { lab } = require("../../models");
const { userlab } = require("../../models");
const { inventory } = require("../../models");

//CREATE NEW LAB
exports.postLab = async (req, res, next) => {
  try {
    //Error handler for validation proccess
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const err = new Error("Validation Failed.");
      err.statusCode = 422;
      throw err;
    }

    //Add data to database
    const labModel = await lab.create({
      id: crypto.randomUUID(),
      lab_name: req.body.lab_name,
    });
    await labModel.save();
    const userlabModel = await userlab.create({
      user_id: req.userId,
      lab_id: labModel.id,
    });
    await userlabModel.save();

    //respon for client
    res.status(200).json({
      message: "Inventory Created Successfully.",
      id: labModel.id,
      lab_name: labModel.lab_name,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//FETCH LIST LAB
exports.getLabs = async (req, res, next) => {
  try {
    //Fetch all lab data from DB
    const LabModel = await lab.findAll();

    //respon for client
    res.status(200).json({
      list: LabModel,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//FETCH SINGLE LAB BY ID
exports.getLab = async (req, res, next) => {
  try {
    //find lab by id
    const LabModel = await lab.findByPk(req.params.id);

    //respon for client
    res.status(200).json({
      list: LabModel,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//FETCH ALL DATA INVENTORY IN LAB
exports.getLabInvent = async (req, res, next) => {
  try {
    //find inventory by labId
    const inventModel = await inventory.findAll({
      where: { labId: req.body.labId },
    });
    if (!inventModel) {
      const err = new Error("lab not have an inventory.");
      err.statusCode = 404;
      throw err;
    }

    //respon for client
    res.status(200).json({
      message: "inventory found.",
      list: inventModel,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//UPDATE DATA LAB BY ID
exports.putLab = async (req, res, next) => {
  try {
    //Error handler for validation proccess
    const err = validationResullt(req);
    if (!err.isEmpty()) {
      const err = new Error("Validation Failed.");
      err.statusCode = 422;
      throw err;
    }

    //update data in DB
    const LabModel = await lab.findByPk(req.params.id);
    LabModel.lab_name = req.body.lab_name;
    await LabModel.save();

    //respon for client
    res.status(200).json({
      message: "Inventory Data Updated",
      lab_name: LabModel.lab_name,
    });
  } catch (err) {
    //catch the error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
