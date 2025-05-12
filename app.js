import http from "http";
import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!");
  next();
});
app.use((req, res, next) => {
  console.log("In another!");
});

const server = http.createServer(app);

// listen will keep this running to listen for incoming request
// it takes a port and a hostname
server.listen(3000);
