const listing = require("../model/listing");
const comment = require("../model/comment");

module.exports.review = async (req, res) => {
  let result = await listing.findById(req.params.id);
  let newReview = new comment(req.body.comment);
  newReview.author = req.user._id;
  result.comments.push(newReview);
  await newReview.save();
  let result1 = await result.save();
  req.flash("success", "Add review successfully!!!");
  res.redirect(`/listing/${result.id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, commentId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await comment.findByIdAndDelete(commentId);
  req.flash("success", "Delete review succefssfully!!!");
  res.redirect(`/listing/${id}`);
};
