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

app.listen(port, () => {
  console.log(`app is listening on the port number ${port}`);
});
