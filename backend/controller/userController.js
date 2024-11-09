import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const signUpUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, role } = req.body;
        if (!name || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ Message: "All fields are required" });
        }
        if (phoneNumber.length !== 10) {
            return res.status(400).json({ Message: "Invaild phone number" });
        }
        if (email.endsWith("@gmail.com")) {
            const user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ Message: "Email already Exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 16);
            await User.create({
                name,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
            });
            return res
                .status(200)
                .json({ Message: "Account created successfully" });
        } else {
            return res.status(400).json({ Message: "Invaild email" });
        }
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ Message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ Message: "Invaild email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ Message: "Invaild password" });
        }
        if (role !== user.role) {
            return res
                .status(400)
                .json({ Message: "Account does't exist with current role" });
        }
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.SECRETKEY, {
            expiresIn: "1d",
        });
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpsOnly: true,
                sameSite: "strict",
            })
            .json({
                Message: `Welcome back ${user.name}`,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    profilePhoto: user.profilePhoto,
                    bio: user.bio,
                    resume: user.resume,
                    resumeOriginalName: user.resumeOriginalName,
                    skills: user.skills,
                },
            });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export const logOutUser = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({ Message: "User logout successfully" });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { loginUserId, name, email, bio, phoneNumber, skills } = req.body;

        // const profilePhoto = req.file;
        const file = req.file;
        const user = await User.findById(loginUserId).select("-password");
        var cloudResponse;
        // if (profilePhoto) {
        //     const fileUri = getDataUri(profilePhoto);
        //     cloudResponse = await cloudinary.uploader.upload(fileUri);
        //     user.profilePhoto = cloudResponse.secure_url;
        // }
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.resume = cloudResponse.secure_url;
            user.resumeOriginalName = file.originalname;
        }
        if (!user) {
            return res.status(400).json({ Message: "User not found" });
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (bio) {
            user.bio = bio;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if (skills) {
            const skillsArray = skills.split(",");
            user.skills = skillsArray;
        }
        await user.save();
        return res.status(200).json({ Message: "Profile updated", user });
    } catch (error) {
        return res.status(500).json({ Message: error.message });
    }
};

export const profilePhotoEdit = async (req, res) => {
    try {
        const { loginUserId } = req.body;
        const profilePhoto = req.file;
        const user = await User.findById(loginUserId).select("-password");
        var cloudResponse;
        if (profilePhoto) {
            const fileUri = getDataUri(profilePhoto);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profilePhoto = cloudResponse.secure_url;
        }
        await user.save();
        return res.status(200).json({ Message: "ProfilePhoto updated", user });
    } catch (error) {
        return res.status(500).json({ Message: error.message });
    }
};
