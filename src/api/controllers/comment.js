const Comment = require("../models/comment");
const Project = require("../models/project");
const User = require("../models/user");

// TODO: Hilo de comentarios, cambiar estructura

const createComment = async (req, res, next) => {
  try {
    const { projectId, commentId } = req.query;

    const newComment = new Comment(req.body);
    newComment.user = req.user._id;
    const comment = await newComment.save();

    const push = {
      $push: {
        comments: comment._id,
      },
    };

    projectId
      ? await Project.findByIdAndUpdate(projectId, push)
      : await Comment.findByIdAndUpdate(commentId, push);

    await User.findByIdAndUpdate(req.user._id, push);

    return res.status(201).json("Comment Submited");
  } catch (error) {
    return res.status(400).json("error");
  }
};

const deleteComment = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  createComment,
  deleteComment,
};
