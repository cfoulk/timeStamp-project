// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:timeStamp", (req, res) => {
  let timeStamp = req.params.timeStamp;
  //checks if it has a -
  //!timeStamp.match(/-/g)
  if (parseInt(timeStamp) > 10000) {
    //this works because December 17, 1995 03:24:00 is a potential new Date(timestamp) test case since they require all
    timeStamp = parseInt(timeStamp);
    //timeStamp = +timeStamp; //converts this into a number, so that our apiDate assignment can be processed correctly
  }
  let apiDate = new Date(timeStamp);
  if (apiDate.toUTCString() == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }
  res.json({ unix: apiDate.valueOf(), utc: apiDate.toUTCString() });
});

app.get("/api/", (req, res) => {
  let date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
