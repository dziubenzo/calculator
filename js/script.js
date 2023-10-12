let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = 0;

let displayResult = document.querySelector('.display .result');
let displayOperation = document.querySelector('.display .operation');
const buttons = document.querySelector('.buttons');
const digits = buttons.querySelectorAll('.digit');
const digitsArray = Array.from(digits);
const decimalPointButton = document.querySelector('.decimal');
let decimalAllowed = true;
const operators = buttons.querySelectorAll('.operator');
const operatorsArray = Array.from(operators);
const equalsButton = buttons.querySelector('.equals');
let equalsPressed = false;
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
    // Handle an operator button click
  } else if (operatorsArray.includes(event.target) && firstNumber != '') {
    operator = event.target.textContent;
    decimalAllowed = true;
    displayOperation.classList.remove('hidden');
    displayOperation.textContent = `${firstNumber} ${operator}`;
    displayResult.textContent = '0';
    // Call another function
    buttons.removeEventListener('click', getFirstNumber);
    buttons.addEventListener('click', getSecondNumber);
  }
}

// Get second number
// Handle two calculator use-cases:
// 1) Perform multiple operations on the result if an operator button is clicked
// 2) Reset calculator if a digit/decimal point is clicked after clicking the equals button
function getSecondNumber(event) {
  // Skip buttons div itself
  if (event.target === buttons) {
    return;
  }
  // 1) Handle decimal points for the second number
  // 2) Reset calculator and handle decimal points for the first number
  if (equalsPressed && event.target === decimalPointButton) {
    resetCalculator();
    firstNumber = handleDecimalPoints(event, firstNumber);
  } else {
    secondNumber = handleDecimalPoints(event, secondNumber);
  }
  // 1) Handle digits for the second number
  // 2) Reset calculator and handle digits for the first number
  if (digitsArray.includes(event.target)) {
    if (equalsPressed) {
      resetCalculator();
      firstNumber = handleDigits(event, firstNumber);
    } else {
      secondNumber = handleDigits(event, secondNumber);
    }
    // Handle an operator button click
  } else if (operatorsArray.includes(event.target) && secondNumber != '') {
    result = operate(firstNumber, operator, secondNumber);
    operator = event.target.textContent;
    decimalAllowed = true;
    displayOperation.textContent = `${result} ${operator}`;
    displayResult.textContent = '0';
    firstNumber = result;
    secondNumber = '';
    equalsPressed = false;
    // Handle the equals button click
  } else if (event.target === equalsButton && secondNumber != '') {
    result = operate(firstNumber, operator, secondNumber);
    decimalAllowed = true;
    displayOperation.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    displayResult.textContent = result;
    equalsPressed = true;
  }
}

// Handle decimal points (helper function):
function handleDecimalPoints(event, number) {
  // Make sure decimal point can only be used once per number
  if (event.target === decimalPointButton && decimalAllowed) {
    // Add it to the default zero or reset result if clicked first
    if (number === '') {
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
    // console.log(number);
    return number;
  }
}

// Reset calculator once the C button is clicked
// Reset calculator once a digit/decimal point is clicked after clicking an equals button first
function resetCalculator() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  result = 0;
  decimalAllowed = true;
  equalsPressed = false;
  displayOperation.classList.add('hidden');
  displayOperation.textContent = '0';
  displayResult.textContent = '0';
  buttons.removeEventListener('click', getSecondNumber);
  buttons.addEventListener('click', getFirstNumber);
}
