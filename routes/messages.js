const express = require("express"),
  Message = require("../src/schema"),
  router = express.Router();
router.get("/", (req, res) => {
  Message.find((err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.send(messages);
    }
  });
});
router.post("/", (req, res) => {
  var message = {
    name: req.body.name,
    message: req.body.message,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    date: new Date().toLocaleDateString(),
  };
  console.log(message);
  Message.create(message, (err, newMessage) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Message added successfully");
      res.redirect("/messages");
    }
  });
});
module.exports = router;
