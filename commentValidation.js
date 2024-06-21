const joi = require("joi");

let commentSchema = joi.object({
  comment: joi
    .object({
      rating: joi.string().required().min(1).max(5),
      comments: joi.string().required(),
    })
    .required(),
});
module.exports = commentSchema;
