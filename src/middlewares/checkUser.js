const Project = require("../api/models/project");

const checkUser = (req, res, next) => {
  if (req.user.rol !== "admin" && req.user._id.toString() !== req.params.id) {
    return res.status(400).json("No puedes realizar esta acción");
  } else {
    next();
  }
};

const isProjectUser = async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  
  if (
    req.user.rol !== "admin" &&
    req.user._id.toString() !== project.user.toString()
  ) {
    return res.status(400).json("No puedes realizar esta acción");
  } else {
    next();
  }
};

module.exports = { checkUser, isProjectUser };
