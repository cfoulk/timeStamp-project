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
  console.log(timeStamp);
  if (!timeStamp.match(/-/g)) {
    timeStamp = +timeStamp; //converts this into a number, so that our apiDate assignment can be processed correctly
    console.log(timeStamp);
  }
  let apiDate = new Date(timeStamp);
  console.log("apiDate: " + apiDate);

  res.json({ unix: apiDate.valueOf(), utc: apiDate.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
