const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const cloudinaryUpload = async (req, res, next) => {
  const arrayUrls = [];
  const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "proyectos_RTC" },
        (error, result) => {
          if (error) {
            reject("Error en la subida de imágenes");
          } else {
            arrayUrls.push(result.secure_url);
            resolve();
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  };

  try {
    for (const buffer of req.optimizedBuffer) {
      await uploadToCloudinary(buffer);
    }
    req.secure_urls = arrayUrls;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { cloudinaryUpload };
