const Joi = require("@hapi/joi");

const validateLogin = user => {
	const schema = Joi.object().keys({
		email: Joi.string()
			.required()
			.email(),

		password: Joi.string().required()
	});

	return schema.validate(user);
};

module.exports = { validateLogin };
