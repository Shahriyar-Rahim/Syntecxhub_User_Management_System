import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers or cookies
  token = req.cookies['user-token'] || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3. Attach user to request (optional but helpful)
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};