const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    dataType: String,
    val: String,
    completed: {
      type: Boolean,
      default: false, // Default value is false
    },
  },
  { timestamps: true },
  { versionKey: false },
);

const Data = mongoose.model("Data", dataSchema);

module.exports = {
  Data,
};
