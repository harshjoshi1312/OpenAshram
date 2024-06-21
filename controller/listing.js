const listing = require("../model/listing");

module.exports.newListing = (req, res) => {
  res.render("createNew.ejs");
};

module.exports.saveListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let newData = new listing(req.body.listing);
  newData.owner = req.user._id;
  newData.image = { url, filename };
  await newData.save();
  req.flash("success", "Add new listing successfully!!!");
  res.redirect("/listing");
};

module.exports.showAllListing = async (req, res, next) => {
  const result = await listing.find({});
  res.render("allList.ejs", { result });
};

module.exports.findListing = async (req, res) => {
  let { id } = req.params;
  const result = await listing.findById(id);
  if (!result) {
    req.flash("error", "Listing you fing not exit!");
    res.redirect("/listing");
  }
  let originalImage = result.image.url;
  originalImage = originalImage.replace("/upload", "/upload/h_200,w_250");
  res.render("edit.ejs", { result, originalImage });
};

module.exports.editListing = async (req, res, next) => {
  let { id } = req.params;
  let result = await listing
    .findById(id)
    .populate({ path: "comments", populate: { path: "author" } })
    .populate("owner");
  if (!result) {
    req.flash("error", "Requested listing not found!");
    res.redirect("/listing");
  }
  res.render("listing.ejs", { result });
};

module.exports.reserve = async (req, res) => {
  let { id } = req.params;
  let result = await listing.findById(id).populate("owner");
  let user = res.locals.currUser.username;
  let email = res.locals.currUser.email;
  res.render("success.ejs", { user, email, id });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let result = await listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    result.image = { url, filename };
    await result.save();
  }
  req.flash("success", "listing edited successfully!!!");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let result = listing
    .findByIdAndDelete(id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  req.flash("success", "Delete listing successfully!!!");
  res.redirect("/listing");
};
module.exports.category = async (req, res) => {
  let { category } = req.query;
  const result = await listing.find({ category: { $in: category } });
  res.render("category.ejs", { result, category });
};
module.exports.search = async (req, res) => {
  let { search, select } = req.query;
  if (select == "price") {
    let result = await listing.find({ price: search });
    res.render("search.ejs", { result, search });
  }
  if (select == "location") {
    let result = await listing.find({ location: search });
    res.render("search.ejs", { result, search });
  }
  if (select == "country") {
    let result = await listing.find({ country: search });
    res.render("search.ejs", { result, search });
  }
};
