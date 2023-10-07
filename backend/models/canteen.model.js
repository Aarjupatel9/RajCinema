const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const canteenSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    canteenUser: {
      type: String,
      required: true
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
          index:true
        },
        quantity: {
          type: Number,
          required: true,
        }
      }
    ],
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("canteens", canteenSchema);
