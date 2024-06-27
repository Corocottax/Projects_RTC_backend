const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    nameUser: { type: String, required: true },
    imgs: [{ type: String }],
    description: { type: String, required: true, trim: true },
    link: { type: String, required: true },
    deployLink: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [1, 2, 3, 4, 5, 10, 11, 12, 13],
    },
    rating: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "users" },
        vote: { type: Number, min: 1, max: 5 },
      },
    ],
    averageRating: { type: Number, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("projects", projectSchema, "projects");
module.exports = Project;
