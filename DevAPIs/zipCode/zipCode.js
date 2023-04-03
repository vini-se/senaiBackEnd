let zipCode, correctZipCode, spanWrongZipCode, btnSubmit, form;

function getElementById(element){
  return document.getElementById(element)
}

spanWrongZipCode = getElementById("span-wrong-zip-code");
btnSubmit = getElementById("btnSubmit");
zipCode = getElementById("code");
form = getElementById("form");

let inputHtml = [];

function setNewFormObj(){
  for (let i = 0; i < 6; i++) {
    // (form.children[i].children[0]) são os inputs do/no html
    inputHtml.push(form.children[i].children[0])
  }
}

zipCode.addEventListener("input", ()=>{
  zipCodeMask();
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
    setNewFormObj();
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
  let pattern = /^([\d]{5})(-)([\d]{3})/;
  return pattern.test(zipCode);
}

function testZipCode(){
  correctZipCode = zipCode.value;
  if (isValidBrZipCode(correctZipCode)){
    searchZipCode(correctZipCode);
  } else {
    alert("Coloca o CEP correto porfavor!");
  }
}

function searchZipCode(correctZipCode){

  let url = `https://cdn.apicep.com/file/apicep/${correctZipCode}.json`;

  fetch(url)
  .then(res => res.json())
  .then(data => {      
    for (let i = 0; i <= 4; i++){    
      inputHtml[i].value = data[inputHtml[i].id]
    }
    inputHtml[5].value = "Brasil";
  })
}

function searchNewAddr(){
  form.reset(); 
  zipCode.focus();
}