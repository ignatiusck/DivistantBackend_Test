const crypto = require("crypto");
const { validationResult } = require("express-validator");

const { lab } = require("../../models");

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
    const LabModel = await lab.create({
      id: crypto.randomUUID(),
      lab_name: req.body.lab_name,
    });
    await LabModel.save();
    //respon for client
    res.status(200).json({
      message: "Inventory Created Successfully.",
      id: LabModel.id,
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
    //find lab by id
    const LabModel = await lab.findByPk(req.params.id);
    //update data in DB
    LabModel.id = req.id;
    LabModel.lab_name = req.body.lab_name;
    await LabModel.save();
    //respon for client
    res.status(200).json({
      message: "Inventory Data Updated",
      id: LabModel.id,
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
