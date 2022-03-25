// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var moment = require("moment");

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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

//timestamp endpoint
app.get("/api/:date", function (req, res) {
  const re = /^[0-9]/;
  const date = moment(req.params.date);
  const utc = moment(date).format("ddd, DD MMM YYYY HH:mm:ss z") + "GMT";
  const dateInt = parseInt(req.params.date);
  const utcInt = moment(dateInt).format("ddd, DD MMM YYYY HH:mm:ss z") + "GMT";

  if (moment(date).isValid()) {
    res.json({
      unix: parseInt(moment(date).format("x")),
      utc: utc,
    });
  } else if (re.test(dateInt) == true) {
    
    res.json({
      unix: parseInt(moment(dateInt).format("x")),
      utc: utcInt,
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/", function (req, res) {
  let now = Date.now();
  let utcNow = moment(now).format("ddd, DD MMM YYYY HH:mm:ss z") + "GMT";
  res.json({
    unix: parseInt(moment(now).format("x")),
    utc: utcNow,
  });
});
