let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = 0;

let displayResult = document.querySelector('.display .result');
let displayOperation = document.querySelector('.display .operation');
const buttons = document.querySelector('.buttons');
const digits = buttons.querySelectorAll('.digit');
const digitsArray = Array.from(digits);
const decimalPoint = document.querySelector('.decimal');
let decimalAllowed = true;
const operators = buttons.querySelectorAll('.operator');
const operatorsArray = Array.from(operators);
const equalsButton = buttons.querySelector('.equals');
const clearButton = buttons.querySelector('.clear');

buttons.addEventListener('click', getFirstNumber);
clearButton.addEventListener('click', resetCalculator);

// Add two numbers
function add(num1, num2) {
  return +num1 + +num2;
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
  firstNumber = handleDecimalPoints(event, firstNumber);
  if (digitsArray.includes(event.target)) {
    firstNumber = handleDigits(event, firstNumber);
    // If operator clicked and number is not empty:
    // Reset and update variables, update operation display and make it visible
    // Call another function
  } else if (operatorsArray.includes(event.target) && firstNumber != '') {
    operator = event.target.textContent;
    decimalAllowed = true;
    displayOperation.classList.remove('hidden');
    displayOperation.textContent = `${firstNumber} ${operator}`;
    displayResult.textContent = '0';
    buttons.removeEventListener('click', getFirstNumber);
    buttons.addEventListener('click', getSecondNumber);
  }
}

// Get second number
function getSecondNumber(event) {
  // Skip buttons div itself
  if (event.target === buttons) {
    return;
  }
  secondNumber = handleDecimalPoints(event, secondNumber);
  if (digitsArray.includes(event.target)) {
    secondNumber = handleDigits(event, secondNumber);
  } else if (operatorsArray.includes(event.target) && secondNumber != '') {
    result = operate(firstNumber, operator, secondNumber);
    operator = event.target.textContent;
    decimalAllowed = true;
    displayOperation.textContent = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
    displayResult.textContent = '0';
    firstNumber = result;
    secondNumber = '';
  } else if (event.target === equalsButton) {
    result = operate(firstNumber, operator, secondNumber);
    decimalAllowed = true;
    displayOperation.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    displayResult.textContent = result;
    return;
  }
}

// Handle decimal points (helper function):
function handleDecimalPoints(event, number) {
  // Make sure decimal point can only be used once per number
  if (decimalPoint === event.target && decimalAllowed === true) {
    // Add it to the default zero if clicked first
    if (displayResult.textContent === '0' && number === '') {
      number += '0' + event.target.textContent;
      displayResult.textContent = number;
      decimalAllowed = false;
      // Update display and variable
    } else {
      number += event.target.textContent;
      displayResult.textContent = number;
      decimalAllowed = false;
    }
  }
  return number;
}

// Handle digits (helper function)
function handleDigits(event, number) {
  // Make sure only one zero can be at the front
  if (number === '0') {
    return number;
  } else {
    // Update display and variable
    number += event.target.textContent;
    displayResult.textContent = number;
    console.log(number);
    return number;
  }
}

// Reset calculator once the C button is clicked
function resetCalculator(event) {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  result = 0;
  decimalAllowed = true;
  displayOperation.classList.add('hidden');
  displayResult.textContent = '0';
  buttons.removeEventListener('click', getSecondNumber);
  buttons.addEventListener('click', getFirstNumber);
}
