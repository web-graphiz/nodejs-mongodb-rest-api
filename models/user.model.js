const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let usr = this;
  if (!usr.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get("saltFactor"));
  const hash = await bcrypt.hashSync(usr.password, salt);

  usr.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (usrPass) {
  const usr = this;
  return bcrypt.compare(usrPass, usr.password).catch((e) => false);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
