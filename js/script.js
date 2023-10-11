let firstNumber = '';
let secondNumber = '';
let operator = '';

let displayResult = document.querySelector('.display .result');
let displayOperation = document.querySelector('.display .operation');
const buttons = document.querySelector('.buttons');
const digits = buttons.querySelectorAll('.digit');
const digitsArray = Array.from(digits);

buttons.addEventListener('click', getFirstNumber);

// Add two numbers
function add(num1, num2) {
  return num1 + num2;
}

// Subtract two numbers
function subtract(num1, num2) {
  return num1 - num2;
}

// Divide two numbers
function divide(num1, num2) {
  return num1 / num2;
}

// Multiply two numbers
function multiply(num1, num2) {
  return num1 * num2;
}

// Perform specified operation
function operate(num1, operator, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '÷':
      return divide(num1, num2);
    case '×':
      return multiply(num1, num2);
    default:
      return 'Error: improper operator.';
  }
}

// Get first number
function getFirstNumber(event) {
  // Skip buttons div itself
  if (event.target === buttons) {
    return;
  }
  // Update variable and display if digit clicked
  if (digitsArray.includes(event.target)) {
    firstNumber += event.target.textContent;
    displayResult.textContent = firstNumber;
    console.log(firstNumber);
  }
}
