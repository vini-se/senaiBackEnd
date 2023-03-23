let zipCode, correctZipCode, spanWrongZipCode, btnSubmit;

spanWrongZipCode = document.getElementById("span-wrong-zip-code");
btnSubmit = document.getElementById("btnSubmit");
zipCode = document.getElementById("cep");

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

function searchZipCode(correctZipCode){

  let url = `https://viacep.com.br/ws/${correctZipCode}/json`;
  let path = new XMLHttpRequest();
  path.open("GET", url);
  path.onload = () => {
    let response = JSON.parse(path.responseText);

    for (let i = 2; i <= 5; i++){    
      form.children[i].children[0].value = response[form.children[i].children[0].id]
    }
    form.children[6].children[0].value = "Brasil";

  }
  path.send();  
}

function searchNewAddr(){
  for (let i = 1; i <= 6; i++){    
    form.children[i].children[0].value = '';
  }  
  zipCode.focus();
}