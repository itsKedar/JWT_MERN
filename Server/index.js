const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
//setting up server
const app = new express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running on port 5000");
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
//database connection
mongoose.connect(
  process.env.MDB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("connected to MongoDB database");
    }
  }
);

//seting up router
app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));
