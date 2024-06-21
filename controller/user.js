const listing = require("../model/listing");
const useSchema = require("../model/user");
let nodemailer = require("nodemailer");
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

module.exports.signUpForm = (req, res) => {
  res.render("user/signUp.ejs");
};

module.exports.varification = (req, res) => {
  res.send("/listing");
};

module.exports.signUpUser = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new useSchema({ email, username });
    const registerUser = await useSchema.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) {
        return next();
      }
      req.flash("success", "Welcome to wanderLust!");
      let number = Math.floor(Math.random() * 9000);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASS,
        },
      });

      var mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: `Welcome to WanderLust `,
        text: `Your securate OTP : ${number}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.render("user/varification.ejs", { email, number });
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signUp");
  }
};

module.exports.reserve = async (req, res) => {
  let { user, email, checkIn, checkOut, suggestion, id } = req.body;
  var startDateObj = new Date(checkIn);
  var endDateObj = new Date(checkOut);
  var timeDifference = startDateObj - endDateObj;
  var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  let result = await listing.findById(id);

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });
    var mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: `From WanderLust`,
      html: `<center>Thank you ${user} for reserve home!<br /><br />Your reservation was successfully &#127881; .<br /><br /><b>Date from : ${checkIn} TO ${checkOut}</b><br /><br /> suggestion : ${suggestion}<br /><br /><b>Property Details :</b><br /><br /> Property Name : ${
        result.title
      }<br /><br /> Location : ${result.location}<br /><br /><b>Total Price : ${
        result.price * daysDifference
      }</b><br /><br/>&#128077; Thank you for connect us!</center>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signUp");
  }

  res.render("thankyou.ejs", {
    user,
    email,
    checkIn,
    checkOut,
    suggestion,
    result,
    daysDifference,
  });
};

module.exports.loginForm = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  try {
    req.flash("success", "Welcome back to wanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
  } catch (err) {
    req.flash("error", err.message);
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
  }
};

module.exports.logoutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "Successfully logged out!");
    res.redirect("/listing");
  });
};
