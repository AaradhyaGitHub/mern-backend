const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");

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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      // @ts-ignore
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Jackie", email: "jackiee@test.com" });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    console.log(user.dataValues);
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
