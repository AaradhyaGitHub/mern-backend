import express from "express";
import bodyParser from "body-parser";

import { router as adminRoutes } from "./routes/admin.js";
import { router as shopRoutes } from "./routes/shop.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send(`<h1> Page not Found</h1>`);
});

app.listen(3000);
