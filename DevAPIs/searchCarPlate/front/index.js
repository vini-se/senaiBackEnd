let placaCampo = document.getElementById("placa");
let ano, marca, modelo;

// function getCarro() {
//   const placa = placaCampo.value;

//   const url = `../back/carsPlate_DB.json`;

//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       const {cars} = data;

//       const carroProcurado = cars.find(car => car.placa === placa);
//       popularHtml(carroProcurado);
//     });

//   }

function getCarro() {
  const placa = placaCampo.value;

  const url = `http://localhost:3000/car/placa/${placa}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      const carro = data.data;

      popularHtml(carro);

    });
}

function popularHtml(carro) {
  setCampos();
  ano.value = carro.ano;
  marca.value = carro.marca;
  modelo.value = carro.modelo;
  placa.value = carro.placa;
}

function limparCampos() {
  setCampos();
  ano.value = "";
  marca.value = "";
  modelo.value = "";
  placa.value = "";
}

function setCampos() {
  ano = document.getElementById("ano");
  marca = document.getElementById("marca");
  modelo = document.getElementById("modelo");
  placa = document.getElementById("placa");
}
