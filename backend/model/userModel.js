import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 18,
            min: 4,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            min: 10,
            max: 10,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student", "recruiter"],
            required: true,
        },
        bio: { type: String, default: "" },
        resume: { type: String, default: "" },
        resumeOriginalName: { type: String, default: "" },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilePhoto: {
            type: String,
            default: "",
        },
        skills: [{ type: String }],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
