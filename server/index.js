const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { appPort, mongoURI } = require("./config/app");
const router = require("./router");

const app = express();
const PORT = process.env.PORT || appPort;

mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB!");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error occurred while connecting to MongoDB ${err}`);
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use(router);

app.use(express.json());


app.get('/', (req, res) => {
  return res.send("The Blinglist Backend Server")
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error Occurred ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
