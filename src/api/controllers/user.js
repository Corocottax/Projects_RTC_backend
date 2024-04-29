const { sendEmail } = require("../../config/nodemailer");
const { hashPassword } = require("../../utils/hashPasword");
const { generateSign } = require("../../utils/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error en el get de los usuarios");
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("projects comments");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("Error en el get By name de los usuarios");
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newUser.rol = "user";
    const userDuplicated = await User.findOne({ email: req.body.email });

    if (userDuplicated) return res.status(400).json("Usuario ya existente");

    newUser.password = hashPassword(req.body.password);
    const user = await newUser.save();

    sendEmail({ email: newUser.email, password: req.body.password });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json("Error en el registro del usuario");
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("Usuario o contraseña erróneos");

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json("Usuario o contraseña erróneos");
    }
  } catch (error) {
    return res.status(400).json("Usuario o contraseña erróneos");
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newUser = new User(req.body);
    const oldUser = await User.findById(id);

    newUser._id = id;
    newUser.rol = "user";
    newUser.comments = [...oldUser.comments, ...newUser.comments];
    newUser.projects = [...oldUser.projects, ...newUser.projects];

    const user = await User.findByIdAndUpdate(id, newUser, { new: true });

    return res
      .status(200)
      .json({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    return res.status(400).json("Error al actualizar usuario");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Usuario eliminado correctamente", userDeleted });
  } catch (error) {
    return res.status(400).json("Error al eliminar al usuario");
  }
};

module.exports = {
  getUsers,
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
};
