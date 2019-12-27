const Joi = require("@hapi/joi");

const validateNewPost = post => {
	const schema = Joi.object().keys({
		title: Joi.string()
			.min(5)
			.max(50)
			.required(),
		image: Joi.string().required(),
		category: Joi.objectId().required(),
		content: Joi.string().required(),
		isPublished: Joi.boolean().required(),
		Comments: Joi.array().items(Joi.string())
	});

	return schema.validate(post);
};

const validateUpdatedPost = post => {
	const schema = Joi.object().keys({
		title: Joi.string()
			.min(5)
			.max(50),
		image: Joi.string(),
		category: Joi.objectId(),
		content: Joi.string(),
		isPublished: Joi.boolean(),
		Comments: Joi.array().items(Joi.string())
	});

	return schema.validate(post);
};

module.exports = { validateNewPost, validateUpdatedPost };
