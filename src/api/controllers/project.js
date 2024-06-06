const { deleteFile } = require("../../utils/deleteFile");
const { getAverage } = require("../../utils/functions/getAverage");
const { getInfo } = require("../../utils/functions/getInfo");
const {
  getPaginationInfo,
} = require("../../utils/functions/getPaginationInfo");
const { dataPerPage } = require("../../utils/variables/pagination");
const Project = require("../models/project");
const User = require("../models/user");
const moment = require("moment");

const getBestProjects = async (req, res, next) => {
  try {
    const today = moment();
    const thirtyDaysAgo = today.clone().subtract(30, "days");

    const projects = await Project.find({
      createdAt: { $gte: thirtyDaysAgo, $lte: today },
    })
      .sort({ averageRating: "desc" })
      .limit(3);

    return res.json(projects);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getProjects = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;

    const { total, lastPage } = await getPaginationInfo({ Model: Project });

    if (page > lastPage) {
      return res.status(400).json({
        info: getInfo({
          total,
          lastPage,
          page: parseInt(page),
          endpoint: "projects",
        }),
        projects: null,
      });
    }

    const projects = await Project.find()
      .skip((page > lastPage ? lastPage - 1 : page - 1) * dataPerPage)
      .limit(dataPerPage)
      .sort({ createdAt: "desc" });

    return res.status(200).json({
      info: getInfo({
        total,
        lastPage,
        page: parseInt(page),
        endpoint: "projects",
      }),
      projects,
    });
  } catch (error) {
    return res.status(400).json("error");
  }
};

const filterProjects = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;

    const query = {
      nameUser: { $regex: req.query.name || "", $options: "i" },
      averageRating: { $gte: req.query.rating || 0 },
    };

    if (req.query?.type) {
      query.type = req.query.type;
    }

    const { total, lastPage } = await getPaginationInfo({
      Model: Project,
      query,
    });

    const projects = await Project.find(query)
      .skip((page > lastPage ? lastPage - 1 : page - 1) * dataPerPage)
      .limit(dataPerPage)
      .sort({ createdAt: "desc" });

    let queryParams = ``;

    for (const key in req.query) {
      if (key !== "page") {
        queryParams += `&${key}=${req.query[key]}`;
      }
    }

    return res.json({
      info: getInfo({
        total,
        lastPage,
        page: parseInt(page),
        endpoint: "projects/filter",
        queryParams,
      }),
      projects,
    });
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name lastName avatar",
        },
      })
      .populate({
        path: "user",
        select: "name lastName avatar",
      });

    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = new Project(req.body);
    if (req.secure_urls) {
      newProject.imgs = req.secure_urls;
    }
    newProject.rating = {
      user: req.user._id.toString(),
      vote: req.body.vote,
    };
    newProject.user = req.user._id;
    newProject.nameUser = req.user.name;
    newProject.averageRating = req.body.vote;
    const project = await newProject.save();

    await User.findByIdAndUpdate(req.user._id.toString(), {
      $push: {
        projects: project._id.toString(),
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldProject = await Project.findById(id);

    if (req.files?.imgs) {
      oldProject.imgs.forEach((img) => deleteFile(img));
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        imgs: req?.files?.imgs?.map((file) => file.path),
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
      },
      { new: true }
    );

    return res.json(project);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const addInteraction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldProject = await Project.findById(id);

    if (
      req.body.vote &&
      oldProject.rating.find(
        (rating) => rating.user.toString() === req.user._id.toString()
      )
    ) {
      return res.status(400).json("Ya has votado");
    }

    let rating;

    if (req.body.vote) {
      rating = { vote: req.body.vote, user: req.user._id.toString() };
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        averageRating: getAverage(oldProject, req.body.vote),
        $push: {
          rating: rating,
          comments: req.body.comments,
        },
      },
      { new: true }
    );

    return res.json(project);
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    deletedProject?.imgs?.forEach((img) => deleteFile(img));

    return res
      .status(200)
      .json({ message: "Proyecto eliminado", deletedProject });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  getBestProjects,
  getProjects,
  filterProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addInteraction,
};
