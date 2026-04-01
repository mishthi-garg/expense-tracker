let calculation = JSON.parse(localStorage.getItem('calculation')) || '0';
    let justEvaluated = true;
    let lastIsOperator = false;
    document.querySelector('.js-expression').value = calculation;

function handleKeyDownCalc(event){
      if(event.key === 'Enter'){

        if(justEvaluated){
          return;
        }
        updateCalculation('=');
      } else{
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
          const safeExpression = calculation.replace(/[^0-9+\-*/.() ]/g, '');
          const sum = parseFloat(eval(safeExpression).toFixed(2));
          
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
        if (lastIsOperator === true) calculation = calculation.slice(0, -3) || '0'; //space operator space
        else calculation = calculation.slice(0, -1) || '0';
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
            lastIsOperator = true;
          }
          else {
            if (entry === '.' && calculation.split(/[\+\-\*\/]/).pop().includes('.')) {
              return;
            }
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