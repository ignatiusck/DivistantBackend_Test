const crypto = require("crypto");
const { validationResult } = require("express-validator");

const { inventory } = require("../models");

//CREATE NEW INVENTORY
exports.postInvent = async (req, res, next) => {
  try {
    //Error handler for validation proccess
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const err = new Error("Validation Failed.");
      err.statusCode = 422;
      throw err;
    }
    //add data to DB
    const inventModel = await inventory.create({
      id: crypto.randomUUID(),
      inventory_name: req.body.inventory_name,
      inventory_images: req.body.inventory_images,
      labId: req.body.labId,
    });
    await inventModel.save();
    //respon for client
    res.status(200).json({
      message: "inventory created.",
      list: inventModel,
    });
  } catch (err) {
    //catch error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//FETCH LIST INVENTORY
exports.getInverts = async (req, res, next) => {
  try {
    const inventModel = await inventory.findAll();
    res.status(200).json({
      list: inventModel,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//FETCH SINGLE INVENTORY BY ID
exports.getInvert = async (req, res, next) => {
  try {
    const inventModel = await inventory.findByPk(req.params.id);
    res.status(200).json({
      list: inventModel,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//UPDATE SINGLE INVENTORY DATA BY ID
exports.putInvert = async (req, res, next) => {
  try {
    //Error handler for validation proccess
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const err = new Error("Validation Failed.");
      err.statusCode = 422;
      throw err;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//DELETE SINGLE INVENTORY BY ID
exports.deleteInvert = async (req, res, next) => {
  try {
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
