const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/path");

const adminData = require("./admin.js");

router.get("/", (req, res, next) => {
  const 
  res.render("shop");
});

module.exports = router;
