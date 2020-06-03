const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

class validations {
    validateRequest = (req, res, next) => {
        const rules = Joi.object({
            _id: Joi.objectId(req.params.id),
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
        });
        const validationResult = rules.validate(req.body);
        if (validationResult.error) {
            res.status(400).send({
                message: "missing required name field"
            });
            return;
        }
        next();
    };
}
module.exports = new validations();