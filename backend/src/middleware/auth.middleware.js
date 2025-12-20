import jwt from "jsonwebtoken";

import User from "../models/user.model.js"

export async function protect(req,res,next){
	try{
		const token = req.cookies.accessToken;
		if(!token){
			return res.status(400).json({message: "No token Found"})
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded.id).select("-password") //fetch all things except password hashed too

		if(!user){
			return res.status(401).json({ message: "User not found" });
		}

		req.user = user
		next()
	} catch(err){
		return res.status(401).json({ message: "Invalid or expired token" });
	}
}

export function admin(req, res, next) {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		return res.status(403).json({ message: "Admin access only" });
	}
}

export function validateRegister(req, res, next) {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: "All fields required" });
	}

	if (password.length < 6) {
		return res.status(400).json({ message: "Password too short" });
	}

	next();
}

export function validateLogin(req,res,next){
	const {email, password} = req.body;

	if(!email || !password){
		return res.status(400).json({ message: "All fields required" });
	}

	next();
}