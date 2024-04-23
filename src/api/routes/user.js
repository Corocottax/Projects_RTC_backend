const { isAuth, isAdmin } = require("../../middlewares/auth");
const { checkUser } = require("../../middlewares/checkUser");
const {
  register,
  getUser,
  getUsers,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const userRouter = require("express").Router();

userRouter.post("/register", isAuth, isAdmin, register);
userRouter.post("/login", login);
userRouter.put("/:id", isAuth, checkUser, updateUser);
userRouter.delete("/:id", isAuth, checkUser, deleteUser);
userRouter.get("/:id", getUser);
userRouter.get("/", getUsers);

module.exports = userRouter;
