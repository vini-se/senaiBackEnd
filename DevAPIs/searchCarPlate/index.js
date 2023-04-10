let placaCampo = document.getElementById("placa");
let ano, marca, modelo;

function getCarro() {
  const placa = placaCampo.value;

  const url = `./carsPlate_DB.json`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const carros = data.cars;

      const novosCarros = new Map();
      for (const carro of carros) {
        const { placa } = carro;
        novosCarros.set(placa, { ...carro });
      }

      const carroProcurado = novosCarros.get(placa);
      popularHtml(carroProcurado);
    });
}

function popularHtml(carro) {
  setCampos();
  ano.value = carro.ano;
  marca.value = carro.marca;
  modelo.value = carro.modelo;
  placa.value = carro.placa;
}

function setCampos() {
  ano = document.getElementById("ano");
  marca = document.getElementById("marca");
  modelo = document.getElementById("modelo");
  placa = document.getElementById("placa");
}

function limparCampos(){
  ano.value = "";
  marca.value = "";
  modelo.value = "";
  placa.value = "";
}