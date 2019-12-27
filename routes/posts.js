const router = require("express").Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../middleware/auth");
const pascal = require("../utils/pascal");
const { validateNewPost, validateUpdatedPost } = require("../validation/post");
const Post = require("../models/Post");
const Category = require("../models/Category");

// private
// add new post
router.post("/", auth, async (req, res) => {
	// validate req body
	const { error } = validateNewPost(req.body);
	if (error) return res.status(400).json({ errors: error.details });

	let { title, image, category, content, isPublished } = req.body;
	title = pascal(title);
	try {
		// get user data
		let { id } = req.user;
		// check if post existed
		let post = await Post.findOne({ title, user: id });

		if (post) {
			return res
				.status(400)
				.json({ errors: [{ message: "Post Already Existed" }] });
		}

		// add new post
		// category = mongoose.Types.ObjectId(category);
		post = await Post.create({
			title,
			image,
			user: id,
			category,
			content,
			isPublished
		});
		return res.json(post);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

// private
// update specific post
router.put("/:postId", auth, async (req, res) => {
	// validate req body
	const { error } = validateUpdatedPost(req.body);
	if (error) return res.status(400).json({ errors: error.details });

	let { title, image, category, content, isPublished } = req.body;
	title = pascal(title);
	try {
		// get user data
		let { id } = req.user;
		let { postId } = req.params;
		// check if post existed
		let post = await Post.findOne({ _id: postId });

		if (!post)
			return res.status(404).json({ errors: [{ message: "Post Not found" }] });

		// check if authenticated user's id is the same
		// as the to-be-updated post's user id
		if (post.user.toString() !== id)
			return res
				.status(401)
				.json({ errors: [{ message: "Invalid Credentials" }] });

		// update post
		post = await Post.findByIdAndUpdate(post._id, req.body, { new: true });
		return res.json(post);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

// public
// get all Posts
router.get("/", async (req, res) => {
	try {
		let { categoryId } = req.query;
		if (!categoryId) return res.json(await Post.find({}));

		// validate categoryId
		if (!ObjectId.isValid(categoryId))
			return res
				.status(400)
				.json({ errors: [{ message: "Invalid CategoryId" }] });

		// find category
		let category = await Category.findOne({ _id: categoryId });
		if (!category)
			return res
				.status(404)
				.json({ errors: [{ message: "Category Not Found" }] });
		// get from db
		const posts = await Post.find({ category: category._id });

		// send to user
		return res.json(posts);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

// private
// delete specific post
router.delete("/:postId", auth, async (req, res) => {
	try {
		// get user data
		let { id } = req.user;
		let { postId } = req.params;
		// check if post existed
		let post = await Post.findOne({ _id: postId });

		if (!post)
			return res.status(404).json({ errors: [{ message: "Post Not found" }] });

		if (post.user.toString() !== id)
			return res
				.status(401)
				.json({ errors: [{ message: "Invalid Credentials" }] });

		// delete post
		post = await Post.findByIdAndDelete(post._id);
		return res.json(post);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});
module.exports = router;
