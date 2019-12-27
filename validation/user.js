const Joi = require("@hapi/joi");

const validateRegister = user => {
	const schema = Joi.object().keys({
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		email: Joi.string()
			.required()
			.email(),
		blogName: Joi.string()
			.min(5)
			.max(50)
			.required(),
		blogDesc: Joi.string()
			.min(5)
			.max(150)
			.required(),
		social: Joi.object().keys({
			youtube: Joi.string(),
			github: Joi.string(),
			twitter: Joi.string(),
			facebook: Joi.string(),
			linkedin: Joi.string(),
			instagram: Joi.string()
		}),
		password: Joi.string().required()
	});

	return schema.validate(user);
};

module.exports = { validateRegister };
