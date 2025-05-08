const http = require("http");

// requestListener is a function that will execute for every incoming request
// it receives a request and a response object
// rqListener(req, res){}

// this is how you create a server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit();  this kills the ongoing event loop

  res.setHeader("Content-Type", "text/html");
  res.write("<html> <p>Hello from my node js server</p> </html>");
  res.end();
  
});

// listen will keep this running to listen for incoming request
// it takes a port and a hostname
server.listen(3000);
