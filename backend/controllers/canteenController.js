
const canteenModel = require("../models/canteen.model");
const { canteenValidator } = require("../validators/userValidator");

exports.getAllCanteens = async (req, res) => {
    try {
        const canteens = await canteenModel.find().select("-updatedAt -createdAt -__v");
        res.status(200).json({ success: true, canteens });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.getCanteen = async (req, res) => {
    const { _id } = req.body;
    try {
        const canteen = await canteenModel.findById(_id).select("-updatedAt -createdAt -__v");
        res.status(200).json({ success: true, canteen });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.updateCanteens = async (req, res) => {
    const canteenData = req.body;

    const { error } = canteenValidator.validate(canteenData);
    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    try {
        if (canteenData._id == "") {
            delete canteenData._id;
            const newProduct = new canteenModel(canteenData);
            await newProduct.save();
            if (!newProduct) {
                return res
                    .status(404)
                    .json({ success: false, message: "Canteen not found" });
            }
            res.status(200).json({ success: true, message: "canteen successfully added", canteen: newProduct });

        } else {
            const canteen = await canteenModel
                .findByIdAndUpdate(
                    canteenData._id,
                    canteenData,
                    {
                        new: true,
                        upsert: true
                    });

            if (!canteen) {
                return res
                    .status(404)
                    .json({ success: false, message: "Canteen not found" });
            }
            res.status(200).json({ success: true, message: "canteen successfully updated", canteen: canteen });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.removeCanteen = async (req, res) => {
    const { _id } = req.body;
    try {
        const profile = await canteenModel.findByIdAndDelete(_id);
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "canteen not found." });
        }
        res.status(200).json({ success: true, message: "Canteen deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}


//canteen products

exports.getAllCanteenProducts = async (req, res) => {
    const { canteenId } = req.body;
    try {
        const product = await canteenModel.findById(canteenId).populate('products.productId');
        // console.log("getAllCanteenProducts : ",product);
        res.status(200).json({ success: true, products: product.products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}