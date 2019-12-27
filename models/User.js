const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	blogName: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	blogDesc: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 150
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	social: {
		youtube: {
			type: String
		},
		github: {
			type: String
		},
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedin: {
			type: String
		},
		instagram: {
			type: String
		}
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.methods.generateAuth = function() {
	// jwt.sign({ user: { id } }, jwtSecret, { expiresIn: "30d" }, (err, token) => {
	// 	if (err) throw err;
	// 	if (token) return token;
	// });
	return jwt.sign({ user: { id: this._id } }, jwtSecret, { expiresIn: "30d" });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
