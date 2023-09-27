import jwt from "jsonwebtoken";
import { blackListToken } from "../controllers/auth-controller.js";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!blackListToken.has(token)) {
            req.userId = decoded.id;
            req.name=decoded.name;
            next();
            
        } else {
            res.status(401).json({ message: "You are not autherized" });
           
        }

    } catch (error) {
        res.status(401).json({ message: "You are not autherized", error: error });
    }
}