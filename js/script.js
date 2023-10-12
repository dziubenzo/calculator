let firstNumber = '';
let secondNumber = '';
let operator = '';

let displayResult = document.querySelector('.display .result');
let displayOperation = document.querySelector('.display .operation');
const buttons = document.querySelector('.buttons');
const digits = buttons.querySelectorAll('.digit');
const digitsArray = Array.from(digits);
const decimalPoint = document.querySelector('.decimal');
let decimalAllowed = true;
const operators = buttons.querySelectorAll('.operator');
const operatorsArray = Array.from(operators);

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
  // Make sure decimal point can only be used once per number
  // Add it to the default zero if clicked first
  // Update display and variable
  if (decimalPoint === event.target && decimalAllowed === true) {
    if (displayResult.textContent === '0' && firstNumber === '') {
      firstNumber += '0' + event.target.textContent;
      displayResult.textContent = firstNumber;
      decimalAllowed = false;
    } else {
      firstNumber += event.target.textContent;
      displayResult.textContent = firstNumber;
      decimalAllowed = false;
    }
  }
  // Update display and variable
  if (digitsArray.includes(event.target)) {
    // Make sure only one zero can be at the front
    if (firstNumber === '0') {
      return;
    }
    firstNumber += event.target.textContent;
    displayResult.textContent = firstNumber;
    console.log(firstNumber);
    // If operator clicked and number is not empty:
    // Reset and update variables, update operation display and make it visible
    // Call another function
  } else if (operatorsArray.includes(event.target) && firstNumber != '') {
    operator = event.target.getAttribute('value');
    decimalAllowed = true;
    displayOperation.classList.remove('hidden');
    displayOperation.textContent = `${firstNumber} ${event.target.textContent}`;
    buttons.removeEventListener('click', getFirstNumber);
    buttons.addEventListener('click', getSecondNumber);
  }
}

// Get second number
function getSecondNumber(event) {
  console.log("I'm working, I guess?");
  return;
}
