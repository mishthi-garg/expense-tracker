let calculation = JSON.parse(localStorage.getItem('calculation')) || '0';
    let justEvaluated = true;
    let lastIsOperator = false;
    document.querySelector('.js-expression').value = calculation;

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = JSON.parse(localStorage.getItem('total')) || 0;
loadExpenses();

document.querySelector('.js-expression').addEventListener('input', function(e) {
  calculation = e.target.value;
  localStorage.setItem('calculation', JSON.stringify(calculation));
  justEvaluated = false;
  lastIsOperator = false;
});

function loadExpenses() {
    document.querySelector('.expense-list').innerHTML = '';
    for(let i=expenses.length-1; i>=0; i--){
        document.querySelector('.expense-list').innerHTML += `<p><span class="expense-label">${expenses[i].label}:</span> Rs. ${expenses[i].amount}</p><button class="js-delete-expense" onclick="deleteExpense(${i})">Delete</button>`;
      }
    document.querySelector('.js-total').innerHTML = `Total: Rs. ${total}`;
    }

    function handleKeyDownCalc(event){
      if(event.key === 'Enter'){

        if(justEvaluated){
          addExpense();
          return;
        }
        updateCalculation('=');
      }
    }

    function handleKeyDownLabel(event){
      if(event.key === 'Enter'){
        addExpense();
      }
    }

    function deleteExpense(index) {

      total-= expenses[index].amount;
      expenses.splice(index, 1);
       
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('total', JSON.stringify(total));
      loadExpenses();
    }

    function addExpense() {
      const labelInput = document.querySelector('.js-expense-label');
      const label = labelInput.value.trim();
      const amount = parseFloat(calculation);
      const entry = {
        label: label,
        amount: amount
      };
      if (label === '') {
        alert('Please enter a valid label for the expense.');
        return;
      }
      expenses.push(entry);
      total += amount;
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('total', JSON.stringify(total));
      loadExpenses();
      labelInput.value = '';
      updateCalculation('C');
    }

    function updateCalculation(entry) {

      const operators = ['+', '-', '*', '/'];
      if (entry === '=') {
        if (lastIsOperator === true) {
          alert('Invalid format used');
        }
        else {
          const sum = parseFloat(eval(calculation).toFixed(2));
          if(sum<0){
            alert('Your entry is negative!');
            return;
          }
          calculation = sum.toString();
          justEvaluated = true;
          lastIsOperator = false;
        }
      }
      else if (entry === 'C') {
        calculation = '0';
        justEvaluated = true;
        localStorage.removeItem('calculation');
        lastIsOperator = false;
      }
      else if (entry === 'del') {
        if (lastIsOperator === true) calculation = calculation.slice(0, -3); //space operator space
        else calculation = calculation.slice(0, -1);
        justEvaluated = false;
        lastIsOperator = false;
      }
      else {
        if (justEvaluated && !operators.includes(entry)) {
          calculation = entry;
          justEvaluated = false;
          lastIsOperator = false;
        }
        else {
          if (operators.includes(entry)) {
            if (lastIsOperator === true) {
              calculation = calculation.slice(0, -3);
            }
            calculation += ' ' + entry + ' ';
          }
          else {
            calculation += entry;

            lastIsOperator = false;
          }
          justEvaluated = false;
        }

      }
      localStorage.setItem('calculation', JSON.stringify(calculation));

      if (entry === '=') {
        document.querySelector('.js-expression').style.color = 'yellow';
      }
      else {
        document.querySelector('.js-expression').style.color = 'white';
      }
      document.querySelector('.js-expression').value = calculation;
    }