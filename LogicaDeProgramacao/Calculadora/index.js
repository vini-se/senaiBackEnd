let outputNumbers = "";
let output = document.getElementById("output");
let outputPreview = document.getElementById("outputPreview");
let calculadora = document.getElementById("calculadora");

// Bootstrap Backdrop Alert
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const alert = (message) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div id="alert" class="alert alert-danger alert-dismissible text-center fs-5" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="removeBackdrop()"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  const alertTrigger = document.getElementById("liveAlertBtn");
  function removeBackdrop() {
    calculadora.removeAttribute("class");
  }

function showNumberDisplay(num) {
  outputNumbers += num;
  output.value = outputNumbers;
  outputPreview.value = eval(outputNumbers);
}

function insertOperation(op) {
  const lastCharOutput = outputNumbers.charAt(outputNumbers.length - 1);

  if (lastCharOutput == "") {
  } else if (
    lastCharOutput == "+" ||
    lastCharOutput == "-" ||
    lastCharOutput == "*" ||
    lastCharOutput == "/" ||
    lastCharOutput == "%"
  ) {
    outputNumbers = outputNumbers.slice(0, -1) + op;
  } else {
    outputNumbers += op;
  }
  setOutputDisplay();
}

function calc() {
  outputNumbers = String(eval(outputNumbers));
  output.value = outputNumbers;
  outputPreview.value = "";
}

function setDot() {
  if (outputNumbers.includes(".")) {
    alert("Já tem ponto PORRA!!");
    calculadora.setAttribute("class", "backdropado");
  } else {
    outputNumbers += ".";
    setOutputDisplay();
  }
}

function clearLastChar() {
  outputNumbers = outputNumbers.slice(0, -1);
  setOutputDisplay();
}

function setSquareRoot() {
  let testNumber = Math.sqrt(outputNumbers);
  if (isNaN(testNumber)) {
    alert(
      'Erro de escrita, os Botões de "Raíz quadrada" e de "Potência" são executados com o valor sozinho no display'
    );
  } else {
    outputNumbers = testNumber;
    output.value = outputNumbers;
    outputPreview.value = "";
  }
}

function setPot() {
  let testNumber = Math.pow(outputNumbers, 2);
  if (isNaN(testNumber)) {
    alert(
      'Erro de escrita, os Botões de "Raíz quadrada" e de "Potência" são executados com o valor sozinho no display'
    );
  } else {
    outputNumbers = testNumber;
    output.value = outputNumbers;
    outputPreview.value = "";
  }
}

function setOutputDisplay() {
  output.value = outputNumbers;
  outputPreview.value = outputNumbers;
}

function clearOutputDisplay() {
  outputNumbers = "";
  setOutputDisplay();
}
