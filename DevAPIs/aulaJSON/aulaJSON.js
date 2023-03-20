let cep, street, neighborhood, city, state, country, btnSubmit;

cep = document.getElementById("cep");
cep.addEventListener("input", testarNumero);

cep.addEventListener("keypress", (e) => {
  if (e.key === "Enter") document.getElementById("btnSubmit").click();
})

function setFields() {
  cep = document.getElementById("cep");
  street = document.getElementById("street");
  neighborhood = document.getElementById("neighborhood");
  city = document.getElementById("city");
  state = document.getElementById("state");
  country = document.getElementById("country");
}

function searchAddr(){
  setFields();

  let url = `https://viacep.com.br/ws/${cep.value}/json`;
  let path = new XMLHttpRequest();
  path.open("GET", url);
  path.onload = () => {
    let response = JSON.parse(path.responseText);
    
    neighborhood.value = response.bairro;
    city.value = response.localidade;
    state.value = response.uf;
    country.value = "Brasil";
    street.value = response.logradouro;
  }
  path.send();
  
}

function searchNewAddr(){
  neighborhood.value = "";
  cep.value = "";
  city.value = "";
  state.value = "";
  country.value = "";
  street.value = "";
  cep.focus();
}

function testarNumero(e){
  if ( Number(e.target.value) <= 0 ) e.target.value = '';
  if ( Number(e.target.value ) >= 99999999 ) e.target.value = e.target.value.substring(0, e.target.value.length - 1); 
}