const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../models/User");
const { validateLogin } = require("../validation/auth");

// private
// authenticate
router.get("/", auth, async (req, res) => {
	// get user data
	const { id } = req.user;
	let user = await User.findById(id).select("-password -__v");

	if (!user)
		return res
			.status(401)
			.json({ errors: [{ message: "Invalid Credentials" }] });

	return res.json(user);
});

// public
// login user
router.post("/", async (req, res) => {
	// check req body
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).json({ errors: error.details });

	const { email, password } = req.body;
	// check user email
	let user = await User.findOne({ email });
	if (!user)
		return res
			.status(400)
			.json({ errors: [{ message: "Invalid Credentials" }] });

	try {
		// check user password
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid)
			return res
				.status(400)
				.json({ errors: [{ message: "Invalid Credentials" }] });

		// send auth token
		const token = user.generateAuth();
		res.json({ token });
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

module.exports = router;
