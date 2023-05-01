let placaCampo = document.getElementById("placa");
let marcasSelect = document.getElementById("marcasSelect");
let modelosSelect = document.getElementById("modelosSelect");
let anosSelect = document.getElementById("anosSelect");

// Function para Procurar por placa
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

// Function para Procurar por placa
function getCarro(placa) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: {
        placa: placa
      }
    })
  };

  const url = `http://localhost:3000/cars/result/v2`;
  
  fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    const carro = data.result[0];
    
    popularHtml(carro);
  });
}

// Function para Procurar por placa
function popularHtml(carro) {
  setCampos();
  ano.value = carro.ano;
  marca.value = carro.marca;
  modelo.value = carro.modelo;
  placa.value = carro.placa;
}

// Function para Procurar por placa
function limparCampos() {
  setCampos();
  ano.value = "";
  marca.value = "";
  modelo.value = "";
  placa.value = "";
}

// Function para Procurar por placa
function setCampos() {
  ano = document.getElementById("ano");
  marca = document.getElementById("marca");
  modelo = document.getElementById("modelo");
  placa = document.getElementById("placa");
}

// Function para Procurar por seleção
function getMarcasSelect() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: {
        "": ""
      },
      need: {
        marca: ""
      }
    })
  };

  const url = `http://localhost:3000/cars/search`;

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const opcoes = data.result;
      popularSelectUltimate(opcoes, 'marca')
    });
}

// Function para Procurar por seleção
function getModelosSelect() {
  const marca = marcasSelect.options[marcasSelect.selectedIndex].innerText;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: {
        marca: marca
      },
      need: {
        modelo: ""
      }
    })
  };

  const url = `http://localhost:3000/cars/search`;


  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const opcoes = data.result;
      popularSelectUltimate(opcoes, "modelo")
    });
}

// Function para Procurar por seleção
function getAnosSelect() {
  const modelo = modelosSelect.options[modelosSelect.selectedIndex].innerText;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: {
        modelo: modelo
      },
      need: {
        ano: ""
      }
    })
  };

  const url = `http://localhost:3000/cars/search`;


  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const opcoes = data.result;
      popularSelectUltimate(opcoes, "ano")
    });
}

// Function para Procurar por seleção
function getVeiculos() {

  const marcaSelecionada = marcasSelect.options[marcasSelect.selectedIndex];
  const modeloSelecionado = modelosSelect.options[modelosSelect.selectedIndex];
  const anoSelecionado = anosSelect.options[anosSelect.selectedIndex];

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: {
        marca: marcaSelecionada.value === '' ? '' : marcaSelecionada.innerText,
        modelo: modeloSelecionado.value === '' ? '' : modeloSelecionado.innerText,
        ano: anoSelecionado.value === '' ? '' : anoSelecionado.innerText,
      }
    })
  };

  const url = `http://localhost:3000/cars/result/v2`;


  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      carros = data.result;
      popularLista(carros);
    });
}

// Function para Procurar por seleção
function resetBusca() {
  const reset = [];

  marcasSelect.selectedIndex = 0;
  popularSelectUltimate(reset, 'modelo')
  popularSelectUltimate(reset, 'ano')

  table.setAttribute("style", "display: none");
}

// Function para Procurar por seleção
/**
 * Popula o select passado pelo segundo parametro como string com as opções passadas pelo 1º
 * @param {[]} opcoes 
 * @param {String} oSelect 
 */
function popularSelectUltimate(opcoes, oSelect){
  let selected = marcasSelect

  switch (oSelect) {
    case 'modelo':
      selected = modelosSelect;
      
      while (selected.firstChild) {
        selected.removeChild(selected.firstChild);
      }
      
      var option = document.createElement("option");
      option.text = "Selecione um Modelo!";
      option.value = "";
      selected.appendChild(option);
      break;

    case 'ano':
      selected = anosSelect;

      while (selected.firstChild) {
        selected.removeChild(selected.firstChild);
      }
    
      var option = document.createElement("option");
      option.text = "Selecione um Ano!";
      option.value = "";
      selected.appendChild(option);
      break;
  }

  for (let i = 0; i < opcoes.length; i++) {
    var option = document.createElement("option");
    option.text = opcoes[i][oSelect];
    option.value = i;
    selected.appendChild(option);
  }
}

// Function para Procurar por seleção
/**
 * Popula a lista pelo obj carros passado por parametro
 * @param {[carro]} carros 
 */
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