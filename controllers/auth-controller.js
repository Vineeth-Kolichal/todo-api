import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userSchema from "../models/user-model.js";
import jsonwebtoken from "jsonwebtoken";


const db = mongoose.connection;
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        bcrypt.hash(password, 10).then(async (password) => {
            const userModel = new userSchema({
                name,
                email,
                password
            });
            const user = await userModel.save();
            res.status(201).json({ message: "Account created successfully", data: { name: user.name, email: user.email, createdAt: user.createdAt } });
        })
    } catch (error) {
        res.status(500).json({ message: "Error while signup", error: error });
    }
}
//
export const signin = async (req, res) => {
    try {
        const user = await db.collection('users').findOne({ email: req.body.email });
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((status) => {
                if (status) {
                    jsonwebtoken.sign({ id: user._id,name:user.name }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 }, (err, token) => {
                        if (token) {
                            res.status(200).json({ message: "Successfully logged in", token: token });
                        } else {
                            res.status(500).json({ message: "Something error", error: err });
                        }
                    });
                } else {
                    res.status(404).json({ message: "Username and password not matching" })
                }
            });
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something error", error: error });
    }
}
export const blackListToken = new Set();
export const logout = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        blackListToken.add(token);
        jsonwebtoken.verify(token, process.env.SECRET_KEY, {
            ignoreExpiration: true,
        });
        res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        res.status(500).json({ message: "Something error", error: error });
    }
}

