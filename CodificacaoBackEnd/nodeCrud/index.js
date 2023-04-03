const express = require("express");

const server = express();

server.get(('/curso'), (req, res) => {
  const {nome} = req.query;
  return res.send({curso: `Aprendendo ${nome}`});
})

server.listen(3000);
