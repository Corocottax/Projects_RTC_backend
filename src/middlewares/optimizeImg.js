const sharp = require("sharp");

const optimize = async (req, res, next) => {
  const imgsOptimized = [];

  for (const img of req.files.imgs) {
    const optimizedBuffer = await sharp(img.buffer)
      .resize(800, 800, { fit: "inside" })
      .webp({ quality: 80 })
      .toBuffer();

    imgsOptimized.push(optimizedBuffer);
  }

  req.optimizedBuffer = imgsOptimized;
  next();
};

module.exports = { optimize };
