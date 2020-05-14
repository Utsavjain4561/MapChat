require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  messageRoutes = require("./routes/messages"),
  app = express();

let DATABASE_URL = "mongodb://localhost/mapchat",
  PORT = 8000;
process.env.NODE_ENV = "development";

if (process.env.NODE_ENV === "production") {
  DATABASE_URL = process.env.DATABASE_URL;
  PORT = process.env.PORT;
  app.use(express.static("client/build"));
}

console.log("NODE_ENV", process.env.NODE_ENV);

app.use(cors());
app.use(bodyParser.json()); // server accepts json encoded requests
app.use(bodyParser.urlencoded({ extended: true })); // server accepts form encode requests
app.use("/messages", messageRoutes); // message routes

mongoose
  .connect(DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("OOPS!! ", err);
  });

app.listen(PORT, () => {
  console.log("Sever started at ", PORT);
});
