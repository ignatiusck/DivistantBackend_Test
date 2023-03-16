const crypto = require("crypto");
const { validationResult } = require("express-validator");

const { inventory } = require("../../models");
const { userlab } = require("../../models");

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

    //check relation user to lab
    const userlabModel = await userlab.findOne({
      where: { user_id: req.userId, lab_id: req.body.labId },
    });
    if (!userlabModel) {
      const err = new Error("user, not the manager lab's.");
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
    //Fetch all inventory
    const inventModel = await inventory.findAll();
    res.status(200).json({
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

//FETCH SINGLE INVENTORY BY ID
exports.getInvert = async (req, res, next) => {
  try {
    //Fetch single inventory
    const inventModel = await inventory.findByPk(req.params.id);
    res.status(200).json({
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

    //check relation user to lab
    const userlabModel = await userlab.findOne({
      where: { user_id: req.userId, lab_id: req.body.labId },
    });
    if (!userlabModel) {
      const err = new Error("user, not the manager lab's.");
      err.statusCode = 422;
      throw err;
    }

    //update data to DB
    const invertModel = await inventory.update({
      inventory_name: req.body.inventory_name,
      inventory_images: req.body.inventory_images,
    });
    await invertModel.save();

    //respon to client
    res.status(200).json({
      message: " data updated.",
    });
  } catch (err) {
    //catch error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//DELETE SINGLE INVENTORY BY ID
exports.deleteInvert = async (req, res, next) => {
  try {
    //find the inventory
    const inventModel = await inventory.findByPk(req.body.inventory_id);
    if (!inventModel) {
      const err = new Error("inventory not found.");
      err.statusCode = 404;
      throw err;
    }

    //user relation to inventory
    const userlabModel = await userlab.findOne({
      where: { user_id: req.userId, lab_id: inventModel.labId },
    });
    if (!userlabModel) {
      const err = new Error("Deleting failed.");
      err.statusCode = 422;
      throw err;
    }

    //delete the inventory
    await inventModel.destroy();

    //respon for client
    res.status(200).json({
      message: "Deleting succeed",
    });
  } catch (err) {
    //catch error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
