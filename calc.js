let calculation = JSON.parse(localStorage.getItem('calculation')) || '0';
    let justEvaluated = true;
    let lastIsOperator = false;
    document.querySelector('.js-expression').value = calculation;

function handleKeyDownCalc(event){
      if(event.key === 'Enter'){

        if(justEvaluated){
          addExpense();
          return;
        }
        updateCalculation('=');
      } else{
        calculation+=event.key;
        document.querySelector('.js-expression').style.color = 'white';
      }
    }

    function updateCalculation(entry) {

      const operators = ['+', '-', '*', '/'];
      if (entry === '=') {
        if (lastIsOperator === true) {
          alert('Invalid calculation format used');
        }
        else {
          const sum = parseFloat(eval(calculation).toFixed(2));
          
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