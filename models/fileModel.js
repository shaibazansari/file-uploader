const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  fileName: {
    type: String,
    required: [true, "Uploaded file must have a unique name"],
  },
  size: { type: Number, required: true },
  uploadedOn: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "File must belong to User!"],
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
