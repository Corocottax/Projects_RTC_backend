const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    name_user: { type: String, required: true },
    imgs: [{ type: String }],
    description: { type: String, required: true, trim: true },
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
    average_rating: { type: Number, required: true },
    /* comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }], */
    comments: [{ type: String }],
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("projects", projectSchema, "projects");
module.exports = Project;
