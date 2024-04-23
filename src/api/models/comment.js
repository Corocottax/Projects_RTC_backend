const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    reactions: [{ type: String }],
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }]
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comments", commentSchema, "comments");
module.exports = Comment;