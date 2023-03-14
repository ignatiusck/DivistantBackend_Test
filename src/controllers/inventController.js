const crypto = require("crypto");

const { inventory } = require("../models");

exports.postInvent = async (req, res, next) => {
  try {
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

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

exports.putInvert = async (req, res, next) => {
  try {
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteInvert = async (req, res, next) => {
  try {
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
