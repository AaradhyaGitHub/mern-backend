const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/path");

const adminData = require("./admin.js");

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
});

module.exports = router;
