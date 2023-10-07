const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({

    canteen: {
        type: Schema.Types.ObjectId,
        ref: "canteens",
        required: true,
    },
    product: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true,
                index:true,
            },
            quantity: {
                type: Number,
                required: true
            },
            sellingQuantity: {
                type: Number,
                required: true
            },
            dumpQuantity: {
                type: Number,
                required: true
            }
        }
    ],
    combo: [
        {
            comboId: {
                type: Schema.Types.ObjectId,
                ref: "combos",
                required: true,
                index:true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },

}, { timestamps: true, strict: false });

module.exports = mongoose.model("reports", reportSchema);
