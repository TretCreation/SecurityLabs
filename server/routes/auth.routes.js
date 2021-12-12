const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const router = new Router()
const jwt = require("jsonwebtoken")
const config = require("config")

router.post("/registration", 
	[
		check("email", "Uncorrect email").isEmail(),
		check("password", "Password must be longer that 4 and shorter than 8").isLength({min:4, max:8})
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({message: "Uncorrect request", errors})
		}

		const {email, password} = req.body

		const candidate = await User.findOne({email})

		if(candidate) {
			return res.status(400).json({message: `User with email ${email} alredy exist`})
		}
		const hashPassword = await bcrypt.hash(password, 10)
		const user = new User({email, password:hashPassword})
		await user.save();
		return res.json({message: "User was created"})

	} catch (e) {
		console.log(e)
		res.send({message: "Server error"})
	}

})

router.post("/login", 
	async (req, res) => {
	try {
		const {email, password} = req.body
		const user = await User.findOne({email})
		if (!user) {
			return res.status(404).json({message: "User not found"})
		}
		const isPassValid = bcrypt.compareSync(password, user.password)
		if(!isPassValid) {
			return res.status(400).json({message:"Invalid password"})
		}
		const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "2h"})
		return res.json({
			token,
			user: {
				id: user.id,
				email: user.email
			}
		})
	} catch (e) {
		console.log(e)
		res.send({message: "Server error"})
	}

})
module.exports = router