const http = require("http");
const fs = require("fs");
// requestListener is a function that will execute for every incoming request
// it receives a request and a response object
// rqListener(req, res){}

// this is how you create a server
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      `<html> 
        <head>
          <title>Enter Message</title>
        <head> 
        <body>
          <form action='/message' method='POST'>
             <input type='text' name="message">  <!-- Add the name attribute here -->
             <button type='submit'>Send</button>
          </form> 
         </body>
      </html> `
    );
    return res.end();
  }
  // process.exit();  this kills the ongoing event loop

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html> <p>Hello from my node js server</p> </html>");
  res.end();
});

// listen will keep this running to listen for incoming request
// it takes a port and a hostname
server.listen(3000);
