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
      const opcoes = data.carros.map((car) => car.marca);

      popularSelect(opcoes);
    });
}

function getModelosSelect() {
  const marca = marcasSelect.options[marcasSelect.selectedIndex].innerHTML;
  // endpoint para pegar no backend as marcas !!!//
  const url = `http://localhost:3000/cars/brand/${marca}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const opcoes = data.modelos;

      popularSelectModelos(opcoes);
    });
}

function getAnosSelect() {
  const modelo = modelosSelect.options[modelosSelect.selectedIndex].innerHTML;
  // endpoint para pegar no backend as modelos !!!//
  const url = `http://localhost:3000/cars/model/${modelo}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const opcoes = data.anos;

      popularSelectAnos(opcoes);
    });
}

function sendApiAnos() {
  const ano = anosSelect.options[anosSelect.selectedIndex].innerHTML;

  const url = `http://localhost:3000/cars/final/${ano}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:");
    });
}

function getVeiculos() {
  const url = `http://localhost:3000/cars/result`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function popularSelect(opcoes) {
  let marcasSelect = document.getElementById("marcasSelect");

  // cria as opções e adiciona ao elemento select
  for (let i = 0; i < opcoes.length; i++) {
    let option = document.createElement("option");
    option.text = opcoes[i];
    option.value = i;
    marcasSelect.appendChild(option);
  }
}

function popularSelectModelos(opcoes) {
  let modelosSelect = document.getElementById("modelosSelect");

  // Deleta os elementos do select
  while (modelosSelect.firstChild) {
    modelosSelect.removeChild(modelosSelect.firstChild);
  }

  let executouComando = false;

  // cria as opções começa no -1 para no final dar certo :) e adiciona ao elemento select
  for (let i = -1; i < opcoes.length; i++) {
    let option = document.createElement("option");

    // Executa apenas uma vez
    if (!executouComando) {
      option.text = "Selecione um Modelo!";
      executouComando = true;
    } else {
      option.text = opcoes[i].modelo;
    }

    option.value = i;
    modelosSelect.appendChild(option);
  }
}

function popularSelectAnos(opcoes) {
  let anosSelect = document.getElementById("anosSelect");

  // Deleta os elementos do select
  while (anosSelect.firstChild) {
    anosSelect.removeChild(anosSelect.firstChild);
  }

  // Flag para popular o primeiro Elemento
  let executouComando = false;

  // cria as opções começa no -1 para no final dar certo :) e adiciona ao elemento select
  for (let i = -1; i < opcoes.length; i++) {
    let option = document.createElement("option");

    // Executa apenas uma vez
    if (!executouComando) {
      option.text = "Selecione um Ano!";
      executouComando = true;
    } else {
      option.text = opcoes[i].ano;
    }

    option.value = i;
    anosSelect.appendChild(option);
  }
}

getMarcasSelect();
