const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use("/", shopRoutes);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Not Found :(" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
