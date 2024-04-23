const { isAuth } = require("../../middlewares/auth");
const { isProjectUser } = require("../../middlewares/checkUser");
const upload = require("../../middlewares/file");
const {
  filterProjects,
  getProjectById,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addInteraction,
} = require("../controllers/project");

const projectRouter = require("express").Router();

projectRouter.get("/filter", filterProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.get("/", getProjects);
projectRouter.post(
  "/",
  isAuth,
  upload.fields([{ name: "imgs", maxCount: 3 }]),
  createProject
);
projectRouter.put("/interaction/:id", isAuth, addInteraction);
projectRouter.put(
  "/:id",
  isAuth,
  isProjectUser,
  upload.fields([{ name: "imgs", maxCount: 3 }]),
  updateProject
);
projectRouter.delete("/:id", isAuth, isProjectUser, deleteProject);

module.exports = projectRouter;
