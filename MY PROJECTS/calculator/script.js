document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "0";
    let currentOperator = null;
    let prevInput = null;
  
    function updateDisplay() {
      display.textContent = currentInput;
    }
  
    function handleDigitClick(digit) {
      if (currentInput === "0") {
        currentInput = digit;
      } else {
        currentInput += digit;
      }
      updateDisplay();
    }
  
    function handleOperatorClick(operator) {
      if (prevInput !== null && currentOperator !== null) {
        handleEqualsClick();
      }
      prevInput = currentInput;
      currentInput = "0";
      currentOperator = operator;
    }
  
    function handleEqualsClick() {
      if (prevInput === null || currentOperator === null) return;
  
      const prev = parseFloat(prevInput);
      const current = parseFloat(currentInput);
      let result;
  
      switch (currentOperator) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "*":
          result = prev * current;
          break;
        case "/":
          result = prev / current;
          break;
        default:
          return;
      }
  
      currentInput = result.toString();
      currentOperator = null;
      prevInput = null;
      updateDisplay();
    }
  
    function clear() {
      currentInput = "0";
      currentOperator = null;
      prevInput = null;
      updateDisplay();
    }
  
    // Add event listeners to digit buttons
    for (let i = 0; i <= 9; i++) {
      document.getElementById(i.toString()).addEventListener("click", () => {
        handleDigitClick(i.toString());
      });
    }
  
    // Add event listeners to operator buttons
    document
      .getElementById("add")
      .addEventListener("click", () => handleOperatorClick("+"));
    document
      .getElementById("subtract")
      .addEventListener("click", () => handleOperatorClick("-"));
    document
      .getElementById("multiply")
      .addEventListener("click", () => handleOperatorClick("*"));
    document
      .getElementById("divide")
      .addEventListener("click", () => handleOperatorClick("/"));
  
    // Add event listeners to other buttons
    document.getElementById("decimal").addEventListener("click", () => {
      if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
      }
    });
  
    document
      .getElementById("equals")
      .addEventListener("click", handleEqualsClick);
    document.getElementById("clear").addEventListener("click", clear);
  
    document.getElementById("backspace").addEventListener("click", () => {
      currentInput = currentInput.slice(0, -1);
      if (currentInput === "") {
        currentInput = "0";
      }
      updateDisplay();
    });
  
    updateDisplay();
  });