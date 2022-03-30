const calculatorScreen = document.querySelector(".calculator-screen");
const updateScreen = (number) => {
  calculatorScreen.value = number;
};

const updateScreenNew = (number) => {
  calculatorScreen.value += number;
};

const calculatorScreenRecent = document.querySelector(".calculator-screen-recent");
const updateScreenRecent = (historyNumber) => {
  calculatorScreenRecent.value = historyNumber;
};

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
     updateScreen(event.target.value);
    //updateScreenNew (event.target.value);
  });
});

let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";
let historyNumber = "0";

const inputNumber = (number) => {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
};

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    inputOperator(event.target.value);
    //updateScreenNew (event.target.value);
  });
});

const inputOperator = (operator) => {
  if (calculationOperator === "") {
    prevNumber = currentNumber;
  }
  calculationOperator = operator;
  currentNumber = "0";
};

const equalSign = document.querySelector(".equal-sign");
equalSign.addEventListener("click", () => {
  calculate();
  updateScreen(currentNumber);
  updateScreenRecent(historyNumber);
});

const percentage = document.querySelector("#ok");
percentage.addEventListener("click", () => {
  currentNumber += "%"
  updateScreen(currentNumber)
});

const calculate = () => {
  let prevNumberPercentage = prevNumber
  let currentNumberPercentage = currentNumber

  if (prevNumber.includes("%")) {
    prevNumber = prevNumber.replace("%", "");
    prevNumber = prevNumber / 100;
  }

  if (currentNumber.includes("%")){
    currentNumber = currentNumber.replace("%", "")
    currentNumber = currentNumber / 100;
  }

  let result = "";
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = (prevNumber) - (currentNumber);
      break;
    case "*":
      result = (prevNumber) * (currentNumber);
      break;
    case "/":
      result = (prevNumber) /  (currentNumber);
      break;
    default:
      break;
  }

  console.log(prevNumber, currentNumber)

  historyNumber = prevNumberPercentage + " " + calculationOperator + " " + currentNumberPercentage;

  currentNumber = result;
  calculationOperator = "";

  
};

const clearBtn = document.querySelector(".all-clear");
clearBtn.addEventListener("click", () => {
  clearAll();
  updateScreen(currentNumber);
  updateScreenRecent(historyNumber);
});

const clearAll = () => {
  prevNumber = "";
  calculationOperator = "";
  currentNumber = "";
  historyNumber = "";
};

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

inputDecimal = (dot) => {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
};


