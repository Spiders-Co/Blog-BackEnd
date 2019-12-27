const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { categorySchema, Category };
