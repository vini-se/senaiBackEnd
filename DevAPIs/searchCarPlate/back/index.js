const express = require("express");
const fs = require("fs");

const server = express();
server.use(express.json());


// Lê o arquivo JSON
fs.readFile("./carsPlate_DB.json", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Faz o parsing dos dados JSON
  carros = JSON.parse(data);
});

// Adiciona os HEADERS antes das rotas serem definidias
server.use( (req, res, next) => {

  // Rota do site que você deseja fazer as requisições
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

  // Métodos de REQUEST que você deseja permitir
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Métodos de HEADERS que você deseja permitir
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  // Passe para a próxima camada
  next();
})

// Endpoint para MOSTRAR todos os carros
server.get("/cars", (req, res) => {
  return res.json(carros);
});

// Endpoint para MOSTRAR um carro
server.get("/car/placa/:id", (req, res) => {
  const placa = req.params.id; // Extrai o valor do param id para "placa"

  const car = carros.cars.find((carro) => carro.placa === placa); // Procura pelo carro com a placa fornecida

  const retorno = { data: car } // Estrutura do retorno

  return res.json(retorno);
});

server.listen(3000);
