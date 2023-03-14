const crypto = require("crypto");

const { lab } = require("../models");

exports.postLab = async (req, res, next) => {
  try {
    //const err = validationResullt(req);
    // if (!err.isEmpty()) {
    //   const err = new Error("Validation Failed.");
    //   err.statusCode = 422;
    //   throw err;
    // }
    const LabModel = await lab.create({
      id: crypto.randomUUID(),
      lab_name: req.body.lab_name,
    });
    await LabModel.save();

    res.status(200).json({
      message: "Inventory Created Successfully.",
      id: LabModel.id,
      lab_name: LabModel.lab_name,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getLabs = async (req, res, next) => {
  try {
    const LabModel = await lab.findAll();
    res.status(200).json({
      list: LabModel,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getLab = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const LabModel = await lab.findByPk(req.params.id);
    console.log(req.params.id);
    res.status(200).json({
      list: LabModel,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putLab = async (req, res, next) => {};
