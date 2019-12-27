const bcrypt = require("bcryptjs");
const router = require("express").Router();
const User = require("../models/User");
const { validateRegister } = require("../validation/user");

// public
// register new user
router.post("/", async (req, res) => {
	// validate body request
	try {
		const { error } = validateRegister(req.body);
		if (error) return res.status(400).json({ errors: error.details });

		const { name, email, blogName, blogDesc, social, password } = req.body;
		// check if existed

		let user = await User.findOne({ email });
		if (user)
			return res
				.status(400)
				.json({ errors: [{ message: "User Already existed" }] });

		// hash password
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		// add to db
		user = await User.create({
			name,
			email,
			blogName,
			blogDesc,
			social,
			password: hash
		});

		// return auth token
		const token = user.generateAuth();
		return res.json({ token });
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

module.exports = router;
