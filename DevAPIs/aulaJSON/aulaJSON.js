let cep, rua, bairro, cidade, estado, pais;
cep = document.getElementById("cep");

function setFields() {
  cep = document.getElementById("cep");
  rua = document.getElementById("rua");
  bairro = document.getElementById("bairro");
  cidade = document.getElementById("cidade");
  estado = document.getElementById("estado");
  pais = document.getElementById("pais");
}

function buscarEndereco(){
  setFields()
  let url = `https://viacep.com.br/ws/${cep.value}/json`;
  let path = new XMLHttpRequest();
  path.open("GET", url);
  console.log(path);

}

cep.addEventListener("input", testarNumero);

function testarNumero(e){

  if ( Number(e.target.value) <= 0 ) e.target.value = '';

  if ( Number(e.target.value ) >= 99999999 ) e.target.value = e.target.value.substring(0, e.target.value.length - 1)
 
}