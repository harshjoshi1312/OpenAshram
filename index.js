if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");

const dburl = process.env.MONGODB_URL;

main()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}





app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));







//common route
app.get("*", (req, res, next) => {
  // next(new ExpressError(404, "Page not found!"));
  res.redirect("/listing");
  next();
});
//error handling middleware
app.use((err, req, res, next) => {
  let { status = 404, message = "page not found" } = err;
  res.render("error.ejs", { message });
});


app.listen(port, () => {
  console.log(`app is listening on the port number ${port}`);
});
