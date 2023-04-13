let placaCampo = document.getElementById("placa");
let ano, marca, modelo;

function validarPlaca() {
  const placa = placaCampo.value.toUpperCase();
  const placaRegex = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/; // Define a expressão regular
  const placaValida = placaRegex.test(placa);

  if (placaValida) {
    getCarro(placa);
    return;
  }
  alert("Tipo de placa inválida!\nPorfavor digite 'LLLNLNN'");
}

function getCarro(placa) {
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

function getMarcasSelect() {
  // endpoint para pegar no backend as marcas !!!//
  const url = `http://localhost:3000/cars/brand`;
  
  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      const opcoes = data.carros.map( (car) => car.marca );

      popularSelect(opcoes)

    });
}

function popularSelect(opcoes){
  
  let marcasSelect = document.getElementById("marcasSelect");

  // cria as opções e adiciona ao elemento select
  for (let i = 0; i < opcoes.length; i++) {
    let option = document.createElement("option"); 
    option.text = opcoes[i];
    option.value = i;
    marcasSelect.appendChild(option);
  }

}

getMarcasSelect()