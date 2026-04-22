import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema =  new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: [true, "User already exists"],
            lowercase: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minLength: [6, "Password must be at least 6 characters long"],
            select: false,
        },
        name: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model("user", userSchema);

export default User;