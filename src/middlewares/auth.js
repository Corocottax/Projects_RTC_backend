const User = require("../api/models/user");
const { jwtVerify } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    const { id } = jwtVerify(token);

    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json("Unauthoraized");
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.rol === "admin") {
    next();
  } else {
    return res.status(401).json("Unauthoraized");
  }
};

module.exports = { isAuth, isAdmin };
