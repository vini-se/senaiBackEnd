const express = require("express");
const fs = require("fs");
const cors = require("cors");

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

// Rota do site que você deseja fazer as requisições
server.use(cors());

// Endpoint para MOSTRAR todos os carros
server.get("/cars", (req, res) => {
  return res.json(carros);
});

// Endpoint para MOSTRAR um carro
server.get("/car/placa/:placa", (req, res) => {
  const { placa } = req.params; // Extrai o valor do param id para "placa"

  const car = carros.cars.find((carro) => carro.placa === placa); // Procura pelo carro com a placa fornecida

  const retorno = { data: car };
  console.log(retorno); // Estrutura do retorno

  return res.json(retorno);
});

// Endpoint para MOSTRAR todas as marcas dos carros
server.get("/cars/brand", (req, res) => {
  const marcas = carros.cars.map((carro) => carro.marca);

  const marcasSemRepetidos = Array.from(new Set(marcas));

  const response = marcasSemRepetidos.sort().map((marca) => ({ marca }));

  return res.json({ carros: response });
});

// Endpoint para MOSTRAR todos modelos das marcas dos carros
server.get("/cars/brand/:brand", (req, res) => {
  const { brand } = req.params;

  const modelosCarro = carros.cars.filter((carro) => carro.marca === brand);

  const response = modelosCarro.map((carro) => ({ modelo: carro.modelo}) )

  return res.json( {modelos: response} );
});

server.listen(3000);
