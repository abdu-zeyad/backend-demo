"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.get("/data", data);

function data(req, res) {
  let weatherUrl = `https://private-anon-12ca5f39c4-carsapi1.apiary-mock.com/manufacturers`;

  axios.get(weatherUrl).then((result) => {
    const weatherArr = result.data.map((item) => {
      return new Forecast(item);
    });
    res.send(weatherArr);
  });
}
class Forecast {
  constructor(item) {
    this.name = item.name;
  }
}

server.get("/", (req, res) => {
  res.send("hi");
});
server.get("*", (req, res) => {
  res.send("Not found");
});

server.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
