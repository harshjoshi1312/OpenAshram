const express = require("express");
const route = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../model/listing.js");
const comment = require("../model/comment.js");
const {
  commentValidate,
  isloggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controller/review.js");

//review route
route.post(
  "/review",
  isloggedIn,
  commentValidate,
  wrapAsync(reviewController.review)
);
//delete the comment
route.delete(
  "/comments/:commentId",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = route;
