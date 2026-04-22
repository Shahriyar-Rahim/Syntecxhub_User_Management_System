import dotevnv from 'dotenv';
import jwt from "jsonwebtoken";

dotevnv.config();

const encodeToken = (email, id) => {
    const payload = { email, id };
    const key = process.env.JWT_SECRET_KEY;
    const expire = process.env.JWT_EXPIRES_IN;

    return jwt.sign(payload, key, { expiresIn: expire });
};

const decodeToken = (token) => {
    const key = process.env.JWT_SECRET_KEY;

    try {
        return jwt.verify(token, key); 
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
        console.error("Token verification failed:", error.message);
        return null;
    }
};

const authConfig = {
    encodeToken,
    decodeToken
}

export default authConfig;