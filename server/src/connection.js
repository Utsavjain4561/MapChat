const mongoose = require("mongoose");
console.log("URL ", process.env.DATABASE_URL);
mongoose
  .connect(process.env.DATABASE_URL, {
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

module.exports = mongoose;
