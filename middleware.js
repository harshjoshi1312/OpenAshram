const listing = require("./model/listing");
const comment = require("./model/comment");
const schemaValidation = require("./schemaValidate.js");
const commentValidation = require("./commentValidation.js");

module.exports.isloggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must logged in and the creatd listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveredirectUrl = (req, res, next) => {
  res.locals.redirectUrl = req.session.redirectUrl;
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let result = await listing.findById(id);
  if (!result.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You not owner of this listing!!!");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.schemaValidate = (req, res, next) => {
  let { error } = schemaValidation.validate(req.body);
  if (error) {
    let errMess = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMess);
  } else {
    next();
  }
};

module.exports.commentValidate = (req, res, next) => {
  let { error } = commentValidation.validate(req.body);
  if (error) {
    let errMess = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMess);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, commentId } = req.params;
  let result = await comment.findById(commentId);
  if (!result.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You not owner of this listing!!!");
    return res.redirect(`/listing/${id}`);
  }
  next();
};
