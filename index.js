if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const ExpressError = require("./utils/ExpressError.js");
const userSchema = require("./model/user.js");

const listing1 = require("./routes/listing.js");
const review1 = require("./routes/review.js");
const user1 = require("./routes/user.js");
const { log } = require("console");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dburl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("databse connected suceessfully");
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

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log.log("Error : " + error);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(userSchema.authenticate()));

passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

app.use("/listing", listing1);
app.use("/listing/:id", review1);
app.use("/", user1);

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
