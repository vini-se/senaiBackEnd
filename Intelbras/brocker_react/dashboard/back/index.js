const express = require("express");
const fs = require("fs");
const cors = require("cors");

const server = express();
server.use(express.json());

// Lê o arquivo JSON
fs.readFile("./status_mock.json", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Faz o parsing dos dados JSON
  devices = JSON.parse(data);
});

server.use(cors());

// Endpoint para MOSTRAR todos os devices
server.get("/devices", (req, res) => {
  return res.json(devices);
});

server.listen(3000);