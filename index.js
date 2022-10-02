const express = require('express')

//app object contains several functions for routing requests.
const app = express();
const http = require('http')
const hostname = '127.0.0.1'
const port = 4000;

// app.use(express.static(__dirname));
app.use(express.static("src"));
app.use(express.static("src/data"));


//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
  const url = req.url


  res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                      //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
  if (url === "/close") {
    process.send("STOP");
  }

});

// listen for incoming requests.
app.listen(port, () => { //server starts listening for any attempts from a client to connect at port: {port}
  if (err) console.log(err);
  console.log(`Now listening on port ${port}`);
  console.log("Hi Mom!");
});


process.on("STOP", function(){
  console.log("Exiting NodeJS server");
  app.close();
})





// const http = require('http')

// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World\n')
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

