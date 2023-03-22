let zipAddr, correctZipAddr, spanWrongZipAddr, street, neighborhood, city, state, country, btnSubmit;

spanWrongZipAddr = document.getElementById("span-wrong-zip-addr");
btnSubmit = document.getElementById("btnSubmit");

zipAddr = document.getElementById("zipAddr");
zipAddr.addEventListener("input", ()=>{
  zipAddrMask()  
  if (!isValidBrZipAddr(zipAddr.value)){
    zipAddr.classList.add("wrongZipAddr")
    spanWrongZipAddr.setAttribute("style", "opacity:1")
    btnSubmit.setAttribute("disabled", "true")
  }else{
    zipAddr.classList.remove("wrongZipAddr")
    spanWrongZipAddr.setAttribute("style", "opacity:0")
    btnSubmit.removeAttribute("disabled")
  }
})

zipAddr.addEventListener("keypress", (e) => {
  if (e.key === "Enter"){
    testZipAddr();
  }
})

function zipAddrMask() {
  zipAddr.value = zipAddr.value.replace(/\D/g, ""); // remove all NaN chars from input value
  zipAddr.value = zipAddr.value.replace(/^([\d]{5})([\d]{3})/, "$1-$2"); // adds the mask to the input
  
  // if the last digited char was the "-", remove it to allow the user to exclude using backspace
  if (zipAddr.value.slice(-1) === "-") {
    zipAddr.value = zipAddr.value.slice(0, -1);
  }
}

function isValidBrZipAddr(zipAddr) {
  let pattern = /^([\d]{5})([\d]{3})/;
  return pattern.test(zipAddr.replace('-',''));
}

function testZipAddr(){
  correctZipAddr = zipAddr.value.replace('-','');
  if (isValidBrZipAddr(correctZipAddr)){
    searchAddr(correctZipAddr);
  } else {
    alert("Coloca o CEP correto porfavor!");
  }
}


function setFields() {
  zipAddr = document.getElementById("zipAddr");
  street = document.getElementById("street");
  neighborhood = document.getElementById("neighborhood");
  city = document.getElementById("city");
  state = document.getElementById("state");
  country = document.getElementById("country");
}

function searchAddr(correctZipAddr){
  setFields();

  let url = `https://viacep.com.br/ws/${correctZipAddr}/json`;
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
  zipAddr.value = "";
  neighborhood.value = "";
  zipAddr.value = "";
  city.value = "";
  state.value = "";
  country.value = "";
  street.value = "";
  zipAddr.focus();
}