let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = 0;

let displayResult = document.querySelector('.display .result');
let displayOperation = document.querySelector('.display .operation');
const buttonsDiv = document.querySelector('.buttons');
const buttons = document.querySelectorAll('.button');
const digits = buttonsDiv.querySelectorAll('.digit');
const digitsArray = Array.from(digits);
const decimalPointButton = document.querySelector('.decimal');
let decimalAllowed = true;
const operators = buttonsDiv.querySelectorAll('.operator');
const operatorsArray = Array.from(operators);
const equalsButton = buttonsDiv.querySelector('.equals');
let equalsPressed = false;
const clearButton = buttonsDiv.querySelector('.clear');
const subtractButton = buttonsDiv.querySelector('.subtract');
const divideButton = buttonsDiv.querySelector('.divide');
const deleteButton = buttonsDiv.querySelector('.delete');

buttonsDiv.addEventListener('click', getFirstNumber);
clearButton.addEventListener('click', resetCalculator);
deleteButton.addEventListener('click', deleteChar);
document.addEventListener('keydown', simulateClicks);

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
    case '−':
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
  if (event.target === buttonsDiv) {
    return;
  }
  firstNumber = handleDecimalPoints(event, firstNumber);
  if (digitsArray.includes(event.target)) {
    // Handle long number
    if (numberTooLong(firstNumber, 'Number too long!')) {
      return;
    }
    firstNumber = handleDigits(event, firstNumber);
    // Handle an operator button click
  } else if (operatorsArray.includes(event.target)) {
    // Handle negative numbers for the first number
    if (event.target === subtractButton && firstNumber === '') {
      firstNumber = handleNegative(firstNumber);
    } else if (firstNumber === '' || firstNumber === '-') {
      return;
    } else {
      operator = event.target.textContent;
      decimalAllowed = true;
      displayOperation.classList.remove('hidden');
      displayOperation.textContent = `${Number(firstNumber)} ${operator}`;
      displayResult.textContent = '0';
      // Call another function
      buttonsDiv.removeEventListener('click', getFirstNumber);
      buttonsDiv.addEventListener('click', getSecondNumber);
    }
  }
}

// Get second number
// Handle two calculator use-cases:
// 1) Perform multiple operations on the result if an operator button is clicked
// 2) Reset calculator if a digit/decimal point is clicked after clicking the equals button
function getSecondNumber(event) {
  // Skip buttons div itself
  if (event.target === buttonsDiv) {
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
      // Handle long number
      if (numberTooLong(secondNumber, 'Number too long!')) {
        return;
      }
      secondNumber = handleDigits(event, secondNumber);
    }
    // Handle an operator button click
  } else if (operatorsArray.includes(event.target)) {
    // Handle division by zero
    if (event.target === divideButton && secondNumber === '0') {
      handleDivByZero();
      return;
    }
    // Handle negative numbers for the second number
    if (event.target === subtractButton && secondNumber === '') {
      secondNumber = handleNegative(secondNumber);
    } else if (secondNumber === '' || secondNumber === '-') {
      return;
    } else {
      result = +operate(firstNumber, operator, secondNumber).toFixed(6);
      // Handle long result
      if (numberTooLong(result, 'Result too long!')) {
        return;
      }
      operator = event.target.textContent;
      decimalAllowed = true;
      displayOperation.textContent = `${result} ${operator}`;
      displayResult.textContent = '0';
      firstNumber = result;
      secondNumber = '';
      equalsPressed = false;
    }
    // Handle the equals button click
  } else if (
    event.target === equalsButton &&
    secondNumber != '' &&
    secondNumber != '-'
  ) {
    // Handle division by zero
    if (operator === '÷' && secondNumber === '0') {
      handleDivByZero();
      return;
    }
    result = +operate(firstNumber, operator, secondNumber).toFixed(6);
    // Handle long result
    if (numberTooLong(result, 'Result too long!')) {
      return;
    }
    decimalAllowed = true;
    displayOperation.textContent = `${Number(firstNumber)} ${operator} ${Number(
      secondNumber
    )} =`;
    displayResult.textContent = result;
    equalsPressed = true;
  }
}

// Handle decimal points (helper function)
function handleDecimalPoints(event, number) {
  // Make sure decimal point can only be used once per number
  if (event.target === decimalPointButton && decimalAllowed) {
    // Add it to the default zero or add it with a preceding zero if the negative sign is entered
    if (number === '' || number === '-') {
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
  buttonsDiv.removeEventListener('click', getSecondNumber);
  buttonsDiv.addEventListener('click', getFirstNumber);
}

// Handle negative numbers
function handleNegative(number) {
  number = '-';
  displayResult.textContent = number;
  return number;
}

// Handle division by zero
// Reset calculator
// Display message
function handleDivByZero() {
  resetCalculator();
  displayResult.textContent = 'You dum-dum!';
}

// Handle long numbers
// Reset calculator
// Display message
function numberTooLong(number, message) {
  let string = number.toString();
  if (string.length >= 18) {
    resetCalculator();
    displayResult.textContent = message;
    return true;
  }
  return false;
}

// Delete digit, decimal point or negative sign
function deleteChar() {
  let removedChar = displayResult.textContent.slice(-1);
  let newNumber = displayResult.textContent.slice(0, -1);
  // Determine which number to change
  if (displayResult.textContent === firstNumber) {
    // Make sure the default empty zero is present on the display
    if (newNumber === '') {
      displayResult.textContent = '0';
      firstNumber = '';
      return;
    }
    displayResult.textContent = newNumber;
    firstNumber = newNumber;
    if (removedChar === '.') {
      decimalAllowed = true;
    }
    // Determine which number to change
  } else if (displayResult.textContent === secondNumber) {
    // Make sure the default empty zero is present on the display
    if (newNumber === '') {
      displayResult.textContent = '0';
      secondNumber = '';
      return;
    }
    displayResult.textContent = newNumber;
    secondNumber = newNumber;
    if (removedChar === '.') {
      decimalAllowed = true;
    }
  }
}

// Add keyboard support by simulating clicks
function simulateClicks(event) {
  let fakeClick = new MouseEvent('click', { bubbles: true });
  buttons.forEach((button) => {
    if (event.key === button.getAttribute('data-key')) {
      button.dispatchEvent(fakeClick);
      // Support for user-intuitive Enter press
    } else if (event.key === 'Enter') {
      equalsButton.dispatchEvent(fakeClick);
      // Support for commas
    } else if (event.key === ',') {
      decimalPointButton.dispatchEvent(fakeClick);
    }
  });
}
