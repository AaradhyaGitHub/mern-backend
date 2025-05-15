const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const app = express();


// handlebars setup
// if hbs, file has to end in .hbs
// if handlebars, file ends in .handlebars
app.engine("hbs", expressHbs());
app.set("view engine", "hbs");
// pug setup
// app.set("view engine", "pug");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Not Found :(" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
