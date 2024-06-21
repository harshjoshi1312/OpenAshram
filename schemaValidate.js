const joi = require("joi");

const listingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required().min(0),
      image: joi.string().allow("", null),
      location: joi.string().required(),
      country: joi.string().required(),
      category: joi.string().required(),
    })
    .required(),
});

module.exports = listingSchema;
