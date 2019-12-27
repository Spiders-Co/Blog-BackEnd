const Joi = require("@hapi/joi");

module.exports = category => {
	const schema = Joi.object().keys({
		name: Joi.string()
			.min(3)
			.max(50)
			.required()
	});

	return schema.validate(category);
};
