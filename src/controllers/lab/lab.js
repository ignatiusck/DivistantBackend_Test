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
    if (!LabModel) {
      const err = new Error("lab not found.");
      err.statusCode = 404;
      throw err;
    }

    //find all manager lab
    const userlabModel = await userlab.findAll({
      where: { lab_id: req.params.id },
    });

    //respon for client
    res.status(200).json({
      list_lab: LabModel,
      list_managerId: userlabModel.id,
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

//ADD NEW LAB MANAGER BY EMAIL
exports.postAddUser = async (req, res, next) => {
  //Authorization user
  const userLab = await new userlab.findOne({
    where: { user_id: req.userId, lab_id: req.body.labId },
  });
  if (!userLab) {
    const err = new Error("user is not the manager of the lab");
    err.statusCode = 422;
    throw err;
  }

  //check the user already the manager of the lab or not
  const userModel = await new user.findOne({
    where: { email: req.body.email },
  });
  const userlabModel = await new userlab.findOne({
    where: { user_id: userModel.id, lab_id: req.body.labid },
  });
  if (userlabModel) {
    const err = new Error("User is already the manager of the lab");
    err.statusCode = 422;
    throw err;
  }

  //add user to lab
  const newUserLab = await new userlab.create({
    user_id: userModel.id,
    lab_id: req.body.labid,
  });
  await newUserLab.save();

  //respon for client
  res.status(200).json({
    message: "user added.",
    user: userModel,
  });
};

//REMOVE LAB MANAGER
exports.postRemoveUser = async (req, res, next) => {
  //Authorization user
  const userLab = await new userlab.findOne({
    where: { user_id: req.userId, lab_id: req.body.labId },
  });
  if (!userLab) {
    const err = new Error("user is not the manager of the lab");
    err.statusCode = 422;
    throw err;
  }

  //check the user is manager of the lab or not
  const userLabNew = await new userlab.findOne({
    where: { user_id: req.body.id, lab_id: req.body.labId },
  });
  if (!userLabNew) {
    const err = new Error("user is not the manager of the lab");
    err.statusCode = 422;
    throw err;
  }

  //remove the user
  await userLabNew.destroy();

  //respon for client
  res.status(200).json({
    message: "User removed",
  });
};
