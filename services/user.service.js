const userModel = require("../models/user.model");
const { omit } = require("lodash");

const createUser = async (input) => {
  try {
    const data = await userModel.create(input);
    return omit(data.toJSON(), "password");
  } catch (e) {
    throw new Error(e);
  }
};

const checkEmail = async (email) => {
  return await userModel.where({ email: email }).countDocuments();
};

const validateUser = async (user) => {
  const usr = await userModel.findOne({ email: user.email });

  if (!usr) return false;

  const isValid = await usr.comparePassword(user.password);

  if (!isValid) return false;
  else return omit(usr.toJSON(), "password");
};

module.exports = { createUser, checkEmail, validateUser };
