const {
  checkEmail,
  createUser,
  validateUser,
} = require("../services/user.service");

const createUserHandler = async (req, res, next) => {
  try {
    const usrExist = await checkEmail(req.body.email);

    if (usrExist == 0) {
      const usr = await createUser(req.body);
      return res
        .status(202)
        .jsonp({ msg: "Account Created Successfully!", user: usr });
    } else
      return res
        .status(410)
        .jsonp("E-mail address already exist... Try with new email!");
  } catch (e) {
    return res.status(409).jsonp(e.message);
  }
};

const loginUserHandler = async (req, res, next) => {
  const usr = await validateUser(req.body);

  if (!usr) return res.status(401).jsonp("Invalid email or password!");

  return res
    .status(200)
    .jsonp({ msg: "Login Successful!", usrId: usr._id, usrName: usr.fullName });
};

module.exports = { createUserHandler, loginUserHandler };
