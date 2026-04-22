import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import authConfig from "../config/auth.config.js";

const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      name,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    } else {
      const token = authConfig.encodeToken(user?.email, user?._id?.toString());
      res.cookie("user-token", token);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
          id: user._id,
          email: user.email,
        },
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("user-token", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User creation failed",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const { id } = req.query;
    const data = id ? await User.findById(id) : await User.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { name, role }, 
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await User.deleteMany({ _id: { $in: ids } });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const userController = {
  register,
  login,
  logout,
  createUser,
  getUsers,
  updateUser,
  deleteOne,
  deleteMany,
};

export default userController;
