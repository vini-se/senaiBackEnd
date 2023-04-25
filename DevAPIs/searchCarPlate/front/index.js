let placaCampo = document.getElementById("placa");
let marcasSelect = document.getElementById("marcasSelect");
let modelosSelect = document.getElementById("modelosSelect");
let anosSelect = document.getElementById("anosSelect");
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
  const marca = marcasSelect.options[marcasSelect.selectedIndex].innerText;
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
  const modelo = modelosSelect.options[modelosSelect.selectedIndex].innerText;
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
  const ano = anosSelect.options[anosSelect.selectedIndex].innerText;

  const url = `http://localhost:3000/cars/final/${ano}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {});
}

function getVeiculos() {
  const url = `http://localhost:3000/cars/result`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      carros = data.carrosFiltrados;
      popularLista(carros);
    });

  anosSelect.setAttribute("disabled", "true");
  marcasSelect.setAttribute("disabled", "true");
  modelosSelect.setAttribute("disabled", "true");
}

function resetBusca() {
  const reset = [];

  marcasSelect.selectedIndex = 0;
  popularSelectModelos(reset);
  popularSelectAnos(reset);

  table.setAttribute("style", "display: none");

  anosSelect.removeAttribute("disabled");
  marcasSelect.removeAttribute("disabled");
  modelosSelect.removeAttribute("disabled");
}

function popularSelect(opcoes) {
  // cria as opções e adiciona ao elemento select
  for (let i = 0; i < opcoes.length; i++) {
    let option = document.createElement("option");
    option.text = opcoes[i];
    option.value = i;
    marcasSelect.appendChild(option);
  }
}

function popularSelectModelos(opcoes) {
  // Deleta os elementos do select
  while (modelosSelect.firstChild) {
    modelosSelect.removeChild(modelosSelect.firstChild);
  }

  let option = document.createElement("option");
  option.text = "Selecione um Modelo!";
  option.value = "";
  modelosSelect.appendChild(option);

  for (let i = 0; i < opcoes.length; i++) {
    const option = document.createElement("option");
    option.text = opcoes[i].modelo;
    option.value = i;
    modelosSelect.appendChild(option);
  }
}

function popularSelectAnos(opcoes) {
  // Deleta os elementos do select
  while (anosSelect.firstChild) {
    anosSelect.removeChild(anosSelect.firstChild);
  }

  let option = document.createElement("option");
  option.text = "Selecione um Ano!";
  option.value = '';
  anosSelect.appendChild(option);

  for (let i = 0; i < opcoes.length; i++) {
    let option = document.createElement("option");
    option.text = opcoes[i].ano;
    option.value = i;
    anosSelect.appendChild(option);
  }
  
}

function popularLista(carros) {
  const table = document.getElementById("table");
  table.removeAttribute("style");

  const tBody = table.children[1];
  tBody.innerText = "";

  for (let i = 0; i < carros.length; i++) {
    const carro = carros[i];

    const tr = tBody.insertRow();

    const td_id = tr.insertCell();
    const td_marca = tr.insertCell();
    const td_modelo = tr.insertCell();
    const td_ano = tr.insertCell();
    const td_placa = tr.insertCell();

    td_id.innerText = i + 1;
    td_marca.innerText = carro.marca;
    td_modelo.innerText = carro.modelo;
    td_ano.innerText = carro.ano;
    td_placa.innerText = carro.placa;
  }

  // Rola a página até a table gerada.
  const scrollTopPos = table.offsetTop;
  document.documentElement.scrollTop = scrollTopPos;
  document.body.scrollTop = scrollTopPos;
}

getMarcasSelect();
