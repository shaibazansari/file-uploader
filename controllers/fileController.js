const fs = require("fs");
const path = require("path");
const File = require("../models/fileModel");

const UPLOAD_DIR = "public/uploads";

exports.uploadFile = async (req, res) => {
  const file = req.file;

  try {
    const newFile = new File({
      originalName: file.originalname,
      size: file.size,
      fileName: file.filename,
      user: req.user._id
    });

    await newFile.save();

    res.status(200).json({
      status: "success",
      message: "File created",
      data: {
        file: newFile
      }
    });
  } catch (error) {
    if (fs.existsSync(path.join(UPLOAD_DIR, file.filename))) {
      fs.unlinkSync(path.join(UPLOAD_DIR, file.filename));
    }
    res.status(500).json({ status: "error", message: "Failed to upload file" });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id });

    res.status(200).json({ status: "success", message: "", data: { files } });
  } catch (error) {
    console.error(error);

    res.status(500).json({ status: "error", message: "Failed to retrieve files" });
  }
};
