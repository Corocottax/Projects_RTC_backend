const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    lastName: { type: String, required: false },
    rol: { type: String, enum: ["user", "admin"] },
    avatar: { type: String },
    projects: [{ type: mongoose.Types.ObjectId, ref: "projects" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
    github: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema, "users");
module.exports = User;