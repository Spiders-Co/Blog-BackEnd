const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category"
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
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
