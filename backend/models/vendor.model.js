const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      default: null
    }
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("vendors", vendorSchema);
