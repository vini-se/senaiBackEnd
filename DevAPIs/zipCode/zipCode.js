let zipCode, correctZipCode, spanWrongZipCode, street, neighborhood, city, state, country, btnSubmit;

spanWrongZipCode = document.getElementById("span-wrong-zip-code");
btnSubmit = document.getElementById("btnSubmit");

zipCode = document.getElementById("zipCode");
zipCode.addEventListener("input", ()=>{
  zipCodeMask()  
  if (!isValidBrZipCode(zipCode.value)){
    zipCode.classList.add("wrongZipCode")
    spanWrongZipCode.setAttribute("style", "opacity:1")
    btnSubmit.setAttribute("disabled", "true")
  }else{
    zipCode.classList.remove("wrongZipCode")
    spanWrongZipCode.setAttribute("style", "opacity:0")
    btnSubmit.removeAttribute("disabled")
  }
})

zipCode.addEventListener("keypress", (e) => {
  if (e.key === "Enter"){
    testZipCode();
  }
})

function zipCodeMask() {
  zipCode.value = zipCode.value.replace(/\D/g, ""); // remove all NaN chars from input value
  zipCode.value = zipCode.value.replace(/^([\d]{5})([\d]{3})/, "$1-$2"); // adds the mask to the input
  
  // if the last digited char was the "-", remove it to allow the user to exclude using backspace
  if (zipCode.value.slice(-1) === "-") {
    zipCode.value = zipCode.value.slice(0, -1);
  }
}

function isValidBrZipCode(zipCode) {
  let pattern = /^([\d]{5})([\d]{3})/;
  return pattern.test(zipCode.replace('-',''));
}

function testZipCode(){
  correctZipCode = zipCode.value.replace('-','');
  if (isValidBrZipCode(correctZipCode)){
    searchZipCode(correctZipCode);
  } else {
    alert("Coloca o CEP correto porfavor!");
  }
}

function setFields() {
  zipCode = document.getElementById("zipCode");
  street = document.getElementById("street");
  neighborhood = document.getElementById("neighborhood");
  city = document.getElementById("city");
  state = document.getElementById("state");
  country = document.getElementById("country");
}

function searchZipCode(correctZipCode){
  setFields();

  let url = `https://viacep.com.br/ws/${correctZipCode}/json`;
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
  zipCode.value = "";
  neighborhood.value = "";
  zipCode.value = "";
  city.value = "";
  state.value = "";
  country.value = "";
  street.value = "";
  zipCode.focus();
}