const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add User" });
});

app.get("/users", (req, res, next) => {
  res.render("users", { pageTitle: "Users" });
});

app.get("/add-user", (req, res, next) => {
  res.redirect("/users");
});

app.listen(3000);
