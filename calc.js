let calculation = JSON.parse(localStorage.getItem('calculation')) || '0';
    let justEvaluated = true;
    let lastIsOperator = false;
    console.log(calculation);
    document.querySelector('.js-expression').innerHTML = `${calculation}`;

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    for(let i=0; i<expenses.length; i++){
        document.querySelector('.expense-list').innerHTML += `<p>${expenses[i].label}: Rs. ${expenses[i].amount}</p>`;
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
      localStorage.setItem('expenses', JSON.stringify(expenses));
      const expenseList = document.querySelector('.expense-list');
      expenseList.innerHTML = '<p> Expense List</p>';
      for(let i=0; i<expenses.length; i++){
        expenseList.innerHTML += `<p>${expenses[i].label}: Rs. ${expenses[i].amount}</p>`;
      }
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
        if (lastIsOperator === true) calculation = calculation.slice(0, -3);
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
              lastIsOperator = true;
            }
            calculation += ' ' + entry + ' ';
            lastIsOperator = true;
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

      console.log(calculation);
      document.querySelector('.js-expression').innerHTML = `${calculation}`;
    }