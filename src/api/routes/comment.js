const { isAuth } = require("../../middlewares/auth");
const { isDataUser } = require("../../middlewares/checkUser");
const { createComment, deleteComment } = require("../controllers/comment");
const Comment = require("../models/comment");

const commentRouter = require("express").Router();

commentRouter.post("/", isAuth, createComment);
commentRouter.delete(
  "/:id",
  isAuth,
  (req, res, next) => isDataUser(req, res, next, Comment),
  deleteComment
);

module.exports = commentRouter;
