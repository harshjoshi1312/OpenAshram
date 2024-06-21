const mongoose = require("mongoose");
const Listing = require("../model/listing.js");
const dataMany = require("./data.js");

const initData = async () => {
  dataMany.data = dataMany.data.map((obj) => ({
    ...obj,
    owner: "65a0b515d41c8b2daa096965",
  }));
  await Listing.insertMany(dataMany.data);
  console.log("seccess");
};
initData();
