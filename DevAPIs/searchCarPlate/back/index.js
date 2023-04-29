const express = require("express");
const fs = require("fs");
const cors = require("cors");

const server = express();
server.use(express.json());

var carroFiltrado1, carroFiltrado2, brand, model, ano;

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

// Endpoint para mostrar todos os valores com base no que vc precisa "need"
server.post('/cars/search', (req, res) => {

  const {filter} = req.body;
  const {need} = req.body;

  const carrosFiltrados = filterObjectFilter(filter);

  const filterItem = Object.keys(need)[0];
  
  const valorCarrosSemRepetidos = Array.from(new Set(carrosFiltrados.map(( carro ) => carro[filterItem] )));
  
  const response = valorCarrosSemRepetidos.sort();
  
  return res.json( {"result": response} )
})

// Endpoint para mostrar todos os carros com base no filtro
server.post('/cars/result/v2', (req, res) => {

  const {filter} = req.body;

  const carrosFiltradosV2 = filterObjectFilter(filter)

  return res.json( {"result": carrosFiltradosV2} )
  
})

function filterObjectFilter(toFilterObject){

  const toFilterObjectKeys = Object.keys(toFilterObject);
  let filteredObject = carros.cars;

  toFilterObjectKeys.forEach((filterKey) => {
    if (toFilterObject[filterKey]) {
      filteredObject = filteredObject.filter((carro) => carro[filterKey] === toFilterObject[filterKey]);
    }
  });

  return filteredObject;
}

server.listen(3000);
