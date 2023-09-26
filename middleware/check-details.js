import mongoose from "mongoose"

const db = mongoose.connection;
export const signupDetailsChecking = async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(404).json({ message: "please fill name" });
        } else if (!req.body.email) {
            res.status(404).json({ message: "please fill email" });
        } else if (!req.body.password) {
            res.status(404).json({ message: "please fill password" });
        } else {
            const result = await db.collection('users').findOne({ email: req.body.email });
            if (result) {
                res.status(409).json({ message: "email already registered, please use another one" })
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error while signup", error: error });
    }
}

export const signinDetailsChecking = async (req, res, next) => {
    try {
        if (!req.body.email) {
            res.status(400).json({ message: "please fill email" });
        } else if (!req.body.password) {
            res.status(400).json({ message: "please fill password" });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: "Error while signin", error: error });

    }
}