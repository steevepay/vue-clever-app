require("dotenv").config();
var express = require("express");
var app = express();
var history = require("connect-history-api-fallback");

// Synchronize vuejs history mode
app.use(
  history({
    // Enable logging
    verbose: true
  })
);

// Serve all the files in '/dist' directory
app.use(express.static("dist"));

// Force HTTPS redirection
app.use(function(req, res, next) {
  if (
    req.secure ||
    req.headers["x-forwarded-proto"] === "https" ||
    process.env.NODE_ENV !== "production"
  ) {
    return next();
  } else {
    return res.redirect("https://" + req.headers.host + req.url);
  }
});

app.listen(process.env.PORT, "0.0.0.0", function() {
  console.log("My super vue app is listening on port 8080");
});
