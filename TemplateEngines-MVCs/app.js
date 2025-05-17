const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
{
  /*

        ---- handlebars file naming ----
          if hbs -> file has to end in .hbs
          if handlebars ->  file ends in .handlebars

        ---- handlebars setup ----
        const expressHbs = require("express-handlebars");
        app.engine(
          "hbs",
          expressHbs({
            layoutsDir: "views/layouts/",
            defaultLayout: "main-layout",
            extname: "hbs" -> this targets the layout file only
          })
        );
        app.set("view engine", "hbs");

        ---- pug setup ----
        pug setup
        app.set("view engine", "pug");
  
  */
}

// EJS Setup
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Not Found :(",
    path: req.url // Pass the requested URL path here
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
