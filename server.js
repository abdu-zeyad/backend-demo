"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//schema
const carSchema = new mongoose.Schema({
  name: String,
  avg_price: String,
});
const Car = mongoose.model("car", carSchema);

// routes
app.get("/all", allDataHandler);
app.post("/addToFav", addToFavHandler);
app.get("/getFav", getFavData);
app.delete("/delete", deletefav);
app.put("/update", updatehandler);
// handlers
function allDataHandler(req, res) {
  const url =
    "https://private-anon-12ca5f39c4-carsapi1.apiary-mock.com/manufacturers";
  axios.get(url).then((result) => {
    res.send(result.data);
  });
}

function addToFavHandler(req, res) {
  console.log(req.body);
  const { name, avg_price } = req.body;
  console.log(name);
  const item = new Car({ name: name, avg_price: avg_price });
  item.save();
}

function getFavData(req, res) {
  Car.find({}, (err, data) => {
    res.send(data);
  });
}

function deletefav(req, res) {
  const id = req.query.id;
  console.log(id);
  Car.deleteOne({ _id: id }, (err, data) => {
    Car.find({}, (err, data) => {
      res.send(data);
    });
  });
}
function updatehandler(req, res) {
  const { name, avg_price, id } = req.body;

  Car.find({ _id: id }, (err, data) => {
    data[0].name = name;
    data[0].avg_price = avg_price;
    data[0].save().then(() => {
      Car.find({}, (err, data) => {
        res.send(data);
      });
    });
  });
}
//
app.get("/", (req, res) => {
  res.send("hi");
});
app.get("*", (req, res) => {
  res.send("Not found");
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
