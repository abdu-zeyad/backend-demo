"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
// const axios = require("axios");
const server = express();
server.use(cors());

const PORT = process.env.PORT;

//
// routes
server.get("/all", allDataHandler);

// handlers
function allDataHandler(req, res) {
  const url =
    "https://private-anon-12ca5f39c4-carsapi1.apiary-mock.com/manufacturers";
  axios.get(url).then((result) => {
    res.send(result.data);
  });
}

//
server.get("/", (req, res) => {
  res.send("hi");
});
server.get("*", (req, res) => {
  res.send("Not found");
});

server.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
