require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainRouter = require("./src/api/routes/main");
const { connectDB } = require("./src/config/db");
const { connectCloudinary } = require("./src/config/cloudinary");

const app = express();

connectCloudinary();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route Not Found");
})

app.listen(3000, () => {
    console.log("Levantado en http://localhost:3000");
})