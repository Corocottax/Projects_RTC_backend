const { isAuth, isAdmin } = require("../../middlewares/auth");
const { checkUser } = require("../../middlewares/checkUser");
const {
  register,
  getUser,
  getUsers,
  login,
  updateUser,
  deleteUser,
  checkSession,
  getUsersByName,
} = require("../controllers/user");
const userRouter = require("express").Router();


userRouter.post("/register", isAuth, isAdmin, register);
userRouter.post("/login", login);
userRouter.post("/checksession", isAuth, checkSession);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.get("/getbyname/:name", getUsersByName);
userRouter.put("/:id", isAuth, checkUser, updateUser);
userRouter.delete("/:id", isAuth, checkUser, deleteUser);

module.exports = userRouter;
