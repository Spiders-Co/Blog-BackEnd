const router = require("express").Router();
const auth = require("../middleware/auth");
const pascal = require("../utils/pascal");
const Category = require("../models/Category");
const validate = require("../validation/category");

// private
// add new category
router.post("/", auth, async (req, res) => {
	// validate req body
	const { error } = validate(req.body);
	if (error) return res.status(400).json({ errors: error.details });

	let { name } = req.body;
	name = pascal(name);
	// check if category existed
	let category = await Category.findOne({ name });
	if (category)
		return res
			.status(400)
			.json({ errors: [{ message: "Category Already Existed" }] });

	// add new category
	category = await Category.create({ name });
	return res.json(category);
});

// public
// get all categories
router.get("/", async (req, res) => {
	// get from db
	const categories = await Category.find({});

	// send to user
	res.json(categories);
});

module.exports = router;
