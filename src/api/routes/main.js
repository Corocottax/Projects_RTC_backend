const commentRouter = require("./comment");
const projectRouter = require("./project");
const userRouter = require("./user");
const mainRouter = require("express").Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/comments", commentRouter);
mainRouter.use("/projects", projectRouter);

module.exports = mainRouter;