const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

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

{
  /*
  db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });

  */
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404Page);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
