require("dotenv").config();
const express = require("express"),
  Message = require("./src/schema"),
  bodyParser = require("body-parser"),
  db = require("./src/connection"),
  app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("This is the index route");
});
app.post("/", (req, res) => {
  var message = {
    name: req.body.name,
    message: req.body.message,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  console.log(message);
  Message.create(message, (err, newMessage) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Message added successfully");
    }
  });
});
app.listen(8000, "localhost", () => {
  console.log("Sever started");
});
