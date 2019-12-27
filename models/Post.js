const mongoose = require("mongoose");

const { categorySchema } = require("./Category");

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	image: {
		type: String,
		required: true
	},
	category: {
		type: categorySchema,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	isPublished: {
		type: Boolean,
		required: true
	},
	Comments: [{ type: String }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
