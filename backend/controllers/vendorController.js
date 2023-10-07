
const vendorModel = require("../models/vendor.model");
const { vendorValidator } = require("../validators/userValidator");

exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await vendorModel.find().select("-updatedAt -createdAt -__v");
        res.status(200).json({ success: true, vendors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.getVendor = async (req, res) => {
    const { _id } = req.body;
    try {
        const vendor = await vendorModel.findById(_id).select("-updatedAt -createdAt -__v");
        res.status(200).json({ success: true, vendor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.updateVendors = async (req, res) => {
    const vendorData = req.body;

    const { error } = vendorValidator.validate(vendorData);
    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    try {
        if (vendorData._id == "") {
            delete vendorData._id;
            const newProduct = new vendorModel(vendorData);
            await newProduct.save();
            if (!newProduct) {
                return res
                    .status(404)
                    .json({ success: false, message: "Vendor not found" });
            }
            res.status(200).json({ success: true, message: "vendor successfully added", vendor: newProduct });

        } else {
            const vendor = await vendorModel
                .findByIdAndUpdate(
                    vendorData._id,
                    vendorData,
                    {
                        new: true,
                        upsert: true
                    });

            if (!vendor) {
                return res
                    .status(404)
                    .json({ success: false, message: "Vendor not found" });
            }
            res.status(200).json({ success: true, message: "vendor successfully updated", vendor: vendor });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.removeVendor = async (req, res) => {
    const { _id } = req.body;
    try {
        const profile = await vendorModel.findByIdAndDelete(_id);
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "vendor not found." });
        }
        res.status(200).json({ success: true, message: "Vendor deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}