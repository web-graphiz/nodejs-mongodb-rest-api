const {
  createUserHandler,
  loginUserHandler,
} = require("../controllers/user.controller");
const validateResource = require("../middleware/validateResource");
const { createUserSchema, loginUserSchema } = require("../schemas/user.schema");

const userRoute = async (app) => {
  app.post("/user", validateResource(createUserSchema), createUserHandler);
  app.post("/user/login", validateResource(loginUserSchema), loginUserHandler);
};

module.exports = userRoute;
