const User = require("../models/user.model");
const { hashPassword } = require("../services/hashPassword");
const { userValidator, userIdObjectValidator, useAccountRoleValidator } = require("../validators/userValidator");
const { passwordValidator } = require("../validators/authValidator");

exports.GetUser = async (req, res) => {
    const _id = req.body;
    console.log(_id);
    try {
        const user = await User.findById(_id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

exports.GetAllUsers = async (req, res) => {
    try {
        const rowUsers = await User.find().select("-password").populate('verifiedBy', 'email');
        const users = rowUsers.map((wholeUser) => {
            var user = wholeUser._doc;
            var muser;
            if (user.verifiedBy) {
                muser = {
                    ...user,
                    verifiedBy: user.verifiedBy.email || "-",
                }
            } else {
                muser = {
                    ...user,
                    verifiedBy: "-",
                }
            }
            return muser
        });
        if (!users) {
            return res.status(404).json({ message: "There is no user account" });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

exports.GetNewUsers = async (req, res) => {
    try {
        const rowUsers = await User.find({ isApproved: false }).select("-password").populate('verifiedBy', 'email');
        const users = rowUsers.map((wholeUser) => {
            var user = wholeUser._doc;
            var muser;
            console.log(user);
            if (user.verifiedBy) {
                muser = {
                    ...user,
                    verifiedBy: user.verifiedBy.email || "-",
                }
            } else {
                muser = {
                    ...user,
                    verifiedBy: "-",
                }
            }
            return muser
        });
        console.log("user : ", users);
        if (!users) {
            return res.status(404).json({ message: "Users not found." });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.transferProducts = async (req, res) => {
    try {
        const rowUsers = await User.find({ isApproved: false }).select("-password").populate('verifiedBy', 'email');
        const users = rowUsers.map((wholeUser) => {
            var user = wholeUser._doc;
            var muser;
            console.log(user);
            if (user.verifiedBy) {
                muser = {
                    ...user,
                    verifiedBy: user.verifiedBy.email || "-",
                }
            } else {
                muser = {
                    ...user,
                    verifiedBy: "-",
                }
            }
            return muser
        });
        console.log("user : ", users);
        if (!users) {
            return res.status(404).json({ message: "Users not found." });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}


