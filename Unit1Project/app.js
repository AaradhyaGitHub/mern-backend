const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.render();
});

app.get("/users", (req, res, next) => {
  res.render();
});

app.get("/add-user", (req, res, next) => {
  res.redirect("/users");
});
app.get("/", (req, res, next) => {
    
});

app.listen(3000);
