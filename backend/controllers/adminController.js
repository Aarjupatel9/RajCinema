const canteenModel = require("../models/canteen.model");
const productModel = require("../models/product.model");
const { hashPassword } = require("../services/hashPassword");
const {
  userValidator,
  userIdObjectValidator,
  useAccountRoleValidator,
} = require("../validators/userValidator");
const { passwordValidator } = require("../validators/authValidator");
const mongoose = require("mongoose");

exports.transferProducts = async (req, res) => {
  const body = req.body;
  console.log("body : ", body);

  const canteenId = body.canteenId;
  const products = body.products;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (var i = 0; i < products.length; i++) {
      const product = products[i];
      const opts = { session, new: true };

      // Step 1: Decrease the quantity in the "products" collection
      const productUpdateResult = await productModel.findOneAndUpdate(
        { _id: product._id },
        {
          $inc: { quantity: -product.transferQuantity },
        },
        opts
      );

      if (!productUpdateResult) {
        // If the product doesn't exist in the "products" collection, insert it
        // res.status(500).json({ success: false, message: "there is no products to transfer named : " + product.name });
        throw "there is no products to transfer named : " + product.name;
        break;
      }

      // Step 2: Increase the quantity in the "canteen" collection
      const canteenUpdateResult = await canteenModel.findOneAndUpdate(
        { _id: canteenId, "products.productId": product._id },
        {
          $inc: { "products.$.quantity": product.transferQuantity },
        },
        opts
      );

      if (!canteenUpdateResult) {
        // If the product doesn't exist in the "canteen" collection, add it to the array
        await canteenModel.findOneAndUpdate(
          { _id: canteenId },
          {
            $push: {
              products: {
                productId: product._id,
                quantity: product.transferQuantity,
              },
            },
          },
          opts
        );
      }
      console.log("Product updated:", productUpdateResult);
      console.log("Canteen updated:", canteenUpdateResult);
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    console.log("transfer : ", req.body);
    res.status(200).json({ success: true, message: "product are transfered" });
  } catch (error) {
    // If an error occurs, abort the transaction and handle the error
    console.error(error);
    await session.abortTransaction();
    session.endSession();

    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }

  // }
};
