import jwt from "jwt";

const secret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    if (req.cookies.token) {
        if (jwt.verify(req.cookies.token, secret)) return next();
        return res
            .status(401)
            .json({ success: false, message: "Invalid token" });
    }
    return res.status(401).json({ success: false });
};
