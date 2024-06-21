const express = require("express");
const route = express();
const listing = require("../model/listing.js");
const schemaValidation = require("../schemaValidate.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  isloggedIn,
  isOwner,
  schemaValidate,
  toLowerCase,
} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudinary.js");
const upload = multer({ storage });

route.get("/new", isloggedIn, wrapAsync(listingController.newListing));
route.get("/category", wrapAsync(listingController.category));
route.get("/search", wrapAsync(listingController.search));

route
  .route("/")
  .post(
    isloggedIn,
    upload.single("listing[image]"),
    schemaValidate,

    wrapAsync(listingController.saveListing)
  )
  .get(wrapAsync(listingController.showAllListing));
route.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.findListing)
);

route.post("/:id/reserve", isloggedIn, listingController.reserve);

route
  .route("/:id")
  .get(wrapAsync(listingController.editListing))
  .put(
    isloggedIn,
    isOwner,
    upload.single("listing[image]"),
    schemaValidate,
    wrapAsync(listingController.updateListing)
  );

route.delete(
  "/:id/list",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = route;
