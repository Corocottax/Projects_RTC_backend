const { isAuth } = require("../../middlewares/auth");
const { isDataUser } = require("../../middlewares/checkUser");
const { cloudinaryUpload } = require("../../middlewares/cloudinary");
const upload = require("../../middlewares/file");
const { optimize } = require("../../middlewares/optimizeImg");
const {
  filterProjects,
  getProjectById,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addInteraction,
  getBestProjects,
} = require("../controllers/project");
const Project = require("../models/project");
const projectRouter = require("express").Router();

projectRouter.get("/bestprojects", getBestProjects);
projectRouter.get("/filter", filterProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.get("/", getProjects);
projectRouter.post(
  "/",
  isAuth,
  upload.fields([{ name: "imgs", maxCount: 3 }]),
  optimize,
  cloudinaryUpload,
  createProject
);
projectRouter.put("/interaction/:id", isAuth, addInteraction);
projectRouter.put(
  "/:id",
  isAuth,
  (req, res, next) => isDataUser(req, res, next, Project),
  upload.fields([{ name: "imgs", maxCount: 3 }]),
  optimize,
  cloudinaryUpload,
  updateProject
);
projectRouter.delete(
  "/:id",
  isAuth,
  (req, res, next) => isDataUser(req, res, next, Project),
  deleteProject
);

module.exports = projectRouter;
