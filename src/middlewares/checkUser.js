const Project = require("../api/models/project");

const checkUser = (req, res, next) => {
  if (req.user.rol !== "admin" && req.user._id.toString() !== req.params.id) {
    return res.status(400).json("No puedes realizar esta acción");
  } else {
    next();
  }
};

const isDataUser = async (req, res, next, Model) => {
  const { id } = req.params;

  const data = await Model.findById(id);
  
  if (
    req.user.rol !== "admin" &&
    req.user._id.toString() !== data.user.toString()
  ) {
    return res.status(400).json("No puedes realizar esta acción");
  } else {
    next();
  }
};

module.exports = { checkUser, isDataUser };
