// DOM Loading
const Keys = {
  clear: document.getElementById("clear"),
  negate: document.getElementById("negate"),
  percent: document.getElementById("percent"),
  divide: document.getElementById("divide"),

  seven: document.getElementById("seven"),
  eight: document.getElementById("eight"),
  nine: document.getElementById("nine"),
  multiply: document.getElementById("multiply"),

  four: document.getElementById("four"),
  five: document.getElementById("five"),
  six: document.getElementById("six"),
  minus: document.getElementById("minus"),

  one: document.getElementById("one"),
  two: document.getElementById("two"),
  three: document.getElementById("three"),
  plus: document.getElementById("plus"),

  zero: document.getElementById("zero"),
  decimal: document.getElementById("decimal"),
  equal: document.getElementById("equal"),
};

const display = document.getElementById("display");

// vars for calculating
let actualNumber = "";
let saveNumber = "";

let operation = "";
let equal = false;

let formula = "";

// onclick events
for (var i in Keys) {
  let key = Keys[i];
  let action = key.getAttribute("action");

  key.onclick = () => {
    switch (action) {
      // NUMBERS
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (operation && !saveNumber) {
          saveNumber = actualNumber;
          actualNumber = "";
        } else if (saveNumber && operation && equal) {
          actualNumber = "";
          equal = false;
        }

        actualNumber += action;

        formula = actualNumber;
        break;
      // DECIMAL POINT
      case ".":
        if (!actualNumber.includes(".")) {
          actualNumber += ".";
        }

        formula = actualNumber;
        break;
      // NEGATION
      case "*-1":
        if (actualNumber) {
          actualNumber = String(parseFloat(actualNumber) * -1);
        }

        formula = actualNumber;
        break;
      // CLEAR ALL
      case "c":
        actualNumber = "";
        saveNumber = "";
        operation = "";
        equal = false;

        formula = actualNumber;
        break;
      // OPERATIONS
      case "/":
      case "*":
      case "-":
      case "+":
        if (saveNumber && actualNumber && !equal) {
          let result = calculate();

          equal = true;
          saveNumber = result;

          formula = saveNumber;

          operation = action;
        } else {
          operation = action;
        }

        break;

      // PERCENT
      case "%":
        if (actualNumber && saveNumber && operation) {
          if (operation == "+" || operation == "-") {
            actualNumber = String(
              parseFloat(saveNumber) * (parseFloat(actualNumber) / 100)
            );
          } else if (operation == "/" || operation == "*") {
            actualNumber = String(parseFloat(actualNumber) / 100);
          }
        }

        formula = actualNumber;
        break;

      // CALCULATING
      case "=":
        if (saveNumber && actualNumber) {
          let result = calculate();

          equal = true;
          saveNumber = result;

          formula = saveNumber;
        }
        break;
    }

    updateDisplay();
  };
}

// calculating function
const calculate = () => {
  let result = 0;

  if (operation == "+") {
    result = parseFloat(saveNumber) + parseFloat(actualNumber);
  } else if (operation == "-") {
    result = parseFloat(saveNumber) - parseFloat(actualNumber);
  } else if (operation == "*") {
    result = parseFloat(saveNumber) * parseFloat(actualNumber);
  } else if (operation == "/") {
    result = parseFloat(saveNumber) / parseFloat(actualNumber);
  }

  return String(result);
};

// function for updating display
const updateDisplay = () => {
  if (formula) display.innerText = formula;
  else display.innerText = 0;

  checkActiveOperation(operation);
};

// checking for active operation
const checkActiveOperation = (key) => {
  Keys.plus.classList[`${key == "+" ? "add" : "remove"}`]("activekey");
  Keys.minus.classList[`${key == "-" ? "add" : "remove"}`]("activekey");
  Keys.divide.classList[`${key == "/" ? "add" : "remove"}`]("activekey");
  Keys.multiply.classList[`${key == "*" ? "add" : "remove"}`]("activekey");
};
