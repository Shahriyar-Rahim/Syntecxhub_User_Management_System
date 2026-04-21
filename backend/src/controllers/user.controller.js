import bcrypt from "bcrypt";
import User from "../model/user.model.js";

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.create({ email, password });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};