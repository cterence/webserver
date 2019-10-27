import jwt from "jsonwebtoken";
import { has } from "lodash";

const secret = process.env.JWT_SECRET;

export const isAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, secret);
            return next();
        } catch (err) {
            return res.status(403).json({ success: false, error: err.message });
        }
    }
    return res.status(401).json({ success: false });
};
