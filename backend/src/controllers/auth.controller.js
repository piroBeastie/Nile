import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js"

export async function register(req,res){
    try{
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt)

        const user = await User.create(
            {
                name,
                email,
                password: hashPass
            }
        )

        res.status(200).json({_id: user.id, name:user.name, email:user.email})
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export async function login(req,res){
    try{
        const {email, pass} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(pass, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie(
            "accessToken",
            token,
            {
                httpOnly:true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge : 7*24*60*60*1000
            }
        )

        res.status(200).json({
            message:"Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export function logout(req, res) {
	try {
		res.clearCookie("accessToken", {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({ message: "Logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
