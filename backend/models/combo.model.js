const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comboSchema = new Schema(
    {
        name: {
            type: String,
            required: true,  
        },
        product: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                    index: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true, strict: false }
);

module.exports = mongoose.model("combos", comboSchema);
