const Comment = require("../models/comment");
const Project = require("../models/project");
const User = require("../models/user");

const createComment = async (req, res, next) => {
  try {
    const { idProject, idReply } = req.query;

    const newComment = new Comment(req.body);
    newComment.user = req.user._id;
    newComment.idReply = idReply;
    const comment = await newComment.save();

    const push = {
      $push: {
        comments: comment._id,
      },
    };

    await Project.findByIdAndUpdate(idProject, push);
    await User.findByIdAndUpdate(req.user._id, push);

    return res.status(201).json("Comment Submited");
  } catch (error) {
    return res.status(400).json("error");
  }
};

const addInteraction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldComment = await Comment.findById(id);

    if (
      req.body.reaction &&
      oldComment.reactions.find(
        (reaction) => reaction.user.toString() === req.user._id.toString()
      )
    ) {
      return res.status(400).json("Ya has reaccionado");
    }

    let reaction;

    if (req.body.reaction) {
      reaction = { reaction: req.body.reaction, user: req.user._id.toString() };
    }

    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        $push: {
          reactions: reaction,
        },
      },
      { new: true }
    );

    return res.json(comment);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const deleteCommentFromProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idProject } = req.query;

    const project = await Project.findByIdAndUpdate(idProject, {
      $pull: { comments: id },
    }, { new: true });

    return res.status(200).json(project); 
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  createComment,
  addInteraction,
  deleteCommentFromProject,
};
