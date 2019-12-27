const jwt = require("jsonwebtoken");
const config = require("config");

const jwtSecret = config.get("jwtSecret");

const auth = (req, res, next) => {
	// get token from header
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(401)
			.json({ errors: [{ message: "no token un authorized" }] });

	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ errors: [{ message: "token is not valid" }] });
	}
};

module.exports = auth;
