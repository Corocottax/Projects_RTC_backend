const { isAuth } = require("../../middlewares/auth");
const { checkUser } = require("../../middlewares/checkUser");
const { createComment, deleteComment } = require("../controllers/comment");

const commentRouter = require("express").Router();

commentRouter.post("/", isAuth, createComment);
commentRouter.delete("/:id", isAuth, checkUser, deleteComment);

module.exports = commentRouter;