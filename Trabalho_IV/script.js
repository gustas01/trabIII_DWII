window.addEventListener("DOMContentLoaded", () => {
  const multiples = document.getElementById("multiples");
  const evenorodd__input = document.getElementById("evenorodd__input");
  const evenorodd = document.getElementById("evenorodd");
  const stringlength__input = document.getElementById("stringlength__input");
  const stringlength = document.getElementById("stringlength");
  const calc__input__1 = document.getElementById("calc__input__1");
  const calc__input__2 = document.getElementById("calc__input__2");
  const calc__result = document.getElementById("calc__result");
  const calc__operation = document.getElementById("calc__operation");

  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      const valueOneToTneHundred = document.createElement("p");
      valueOneToTneHundred.innerText = `Número ${i} é múltiplo de 3 e 5`;
      multiples.appendChild(valueOneToTneHundred);
      if (i === 100) valueOneToTneHundred.innerText = i + ". ";
      continue;
    }

    if (i % 3 === 0) {
      const valueOneToTneHundred = document.createElement("p");
      valueOneToTneHundred.innerText = `Número ${i} é múltiplo de 3`;
      multiples.appendChild(valueOneToTneHundred);
      continue;
    }

    if (i % 5 === 0) {
      const valueOneToTneHundred = document.createElement("p");
      valueOneToTneHundred.innerText = `Número ${i} é múltiplo de 5`;
      multiples.appendChild(valueOneToTneHundred);
      continue;
    }
  }

  evenorodd__input.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value % 2 === 0) evenorodd.innerText = "Par";
    else evenorodd.innerText = "Ímpar";
  });

  stringlength__input.addEventListener("input", (e) => {
    const value = e.target.value;
    stringlength.innerText = "Tamanho com espaços: " + value.length;
  });
});

function calculate(e) {
  let operation = e.target.textContent;
  if (calc__input__1.value === "" || calc__input__2.value === "") {
    alert("Digite os dois números");
    return;
  }
  switch (operation) {
    case "+":
      calc__result.innerText = (
        Number(calc__input__1.value) + Number(calc__input__2.value)
      ).toFixed(2);
      break;
    case "-":
      calc__result.innerText = (
        Number(calc__input__1.value) - Number(calc__input__2.value)
      ).toFixed(2);
      break;
    case "*":
      calc__result.innerText = (
        Number(calc__input__1.value) * Number(calc__input__2.value)
      ).toFixed(2);
      break;
    case "/":
      if (Number(calc__input__2.value) === 0) {
        alert("Impossível divisão por zero");
        calc__input__1.value = "";
        calc__input__2.value = "";
        operation = "";
        calc__result.innerText = "";
        break;
      }
      calc__result.innerText = (
        Number(calc__input__1.value) / Number(calc__input__2.value)
      ).toFixed(2);
      break;
  }

  calc__operation.innerText = operation;
}
