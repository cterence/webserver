import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const issueToken = async login => {
    return jwt.sign({ login }, secret, { expiresIn: "4h" });
};
