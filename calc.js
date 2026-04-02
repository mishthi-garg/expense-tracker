// ===== Initialization =====
let calculation = JSON.parse(localStorage.getItem('calculation')) || '0';
let justEvaluated = true;
let lastIsOperator = false;

const inputField = document.querySelector('.js-expression');
inputField.value = calculation;

const operators = ['+', '-', '*', '/'];

// ===== Keyboard Handling =====
function handleKeyDownCalc(event) {
  const key = event.key;

  // Only process Enter key or other allowed keys
  if (key === 'Enter') {
    event.preventDefault(); // prevent form submission
    updateCalculation('=');
    console.log('Enter pressed');
  } else {
    inputField.style.color = 'white';
  }
}

// ===== Main Update Function =====
function updateCalculation(entry) {
  calculation = inputField.value;
  lastIsOperator = operators.includes(calculation.slice(-1));

  // Evaluate expression
  if (entry === '=') {
    if (lastIsOperator) {
      alert('Invalid calculation format!');
      return;
    }

    try {
      const result = eval(calculation); // eval is safe here as input is controlled
      calculation = parseFloat(result.toFixed(2)).toString();
    } catch {
      alert('Invalid calculation!');
      calculation = '0';
    }

    justEvaluated = true;
    lastIsOperator = false;
    inputField.style.color = 'yellow';

  } 
  // Clear all
  else if (entry === 'C') {
    calculation = '0';
    justEvaluated = true;
    lastIsOperator = false;
    localStorage.removeItem('calculation');
    inputField.style.color = 'white';
  } 
  // Delete last character
  else if (entry === 'del') {
    calculation = calculation.slice(0, -1) || '0';
    justEvaluated = false;
    lastIsOperator = operators.includes(calculation.slice(-1));
    inputField.style.color = 'white';
  } 
  // Number or operator input
  else {
    // Replace calculation if just evaluated and entry is a number/dot
    if (justEvaluated && !operators.includes(entry)) {
      calculation = entry;
      justEvaluated = false;
      lastIsOperator = false;
    } 
    else {
      // Operator input
      if (operators.includes(entry)) {
        if (lastIsOperator) calculation = calculation.slice(0, -1);
        calculation += entry;
        lastIsOperator = true;
      } 
      // Number or dot input
      else {
        // Prevent multiple dots in one number
        const lastNumber = calculation.split(/[\+\-\*\/]/).pop();
        if (entry === '.' && lastNumber.includes('.')) return;

        calculation += entry;
        lastIsOperator = false;
      }
      justEvaluated = false;
    }

    inputField.style.color = 'white';
  }

  // Update display & localStorage
  inputField.value = calculation;
  localStorage.setItem('calculation', JSON.stringify(calculation));
}