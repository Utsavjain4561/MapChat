const mongoose = require("mongoose");
validate = require("mongoose-validator");
(nameValidator = [
  validate({
    validator: "isLength",
    arguments: [5, 50],
    message: "Name should be betweem 5 to 50 characters long",
  }),
]),
  (messageValidator = [
    validate({
      validator: "isLength",
      arguments: [5, 200],
      message: "Message should be betweem 5 to 200 characters long",
    }),
  ]);

let userMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: nameValidator },
  message: {
    type: String,
    required: true,
    max: 10,
    validate: messageValidator,
  },
  latitude: { type: Number, min: -90, max: 90 },
  longitude: { type: Number, min: -180, max: 180 },
  date: Date,
});
module.exports = mongoose.model("message", userMessageSchema);
