import http from "http";

import routes from "./routes.js"; // make sure the filename has .js extension

// requestListener is a function that will execute for every incoming request
// it receives a request and a response object
// rqListener(req, res){}

// this is how you create a server
const server = http.createServer(routes);

// listen will keep this running to listen for incoming request
// it takes a port and a hostname
server.listen(3000);
