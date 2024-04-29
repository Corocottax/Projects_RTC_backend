const { isAuth } = require("../../middlewares/auth");
const { isDataUser } = require("../../middlewares/checkUser");
const { createComment, deleteCommentFromProject, addInteraction } = require("../controllers/comment");
const Comment = require("../models/comment");

const commentRouter = require("express").Router();

commentRouter.post("/", isAuth, createComment);
commentRouter.put("/:id", isAuth, addInteraction);
commentRouter.delete(
  "/:id",
  isAuth,
  (req, res, next) => isDataUser(req, res, next, Comment),
  deleteCommentFromProject
);

module.exports = commentRouter;
