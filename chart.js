
let expenseChart = null;
let incomeChart = null;

let labelsExpense = [];
let dataExpense = [];

let labelsIncome = [];
let dataIncome = [];

function renderChart() {

  const expenseTotals ={};
  const incomeTotals ={};
  
  expenses.forEach(expense => {
    if(expense.expenseType === 'INCOME'){
        incomeTotals[expense.category] = (incomeTotals[expense.category] || 0) + expense.amount;
    } else {
        expenseTotals[expense.category] = (expenseTotals[expense.category] || 0) + expense.amount;
    }
  });
  labelsExpense = Object.keys(expenseTotals);
  dataExpense = Object.values(expenseTotals);
  labelsIncome = Object.keys(incomeTotals);
  dataIncome = Object.values(incomeTotals);
}


function generateChart() {
  if (expenseChart) {
    expenseChart.destroy();
  }
  if (incomeChart) {
    incomeChart.destroy();
  }
  renderChart();

  document.getElementById('chart-container').scrollIntoView({
    behavior: 'smooth'
  });

  if (labelsExpense.length === 0 && labelsIncome.length === 0) return;
  const ctxExp = document.getElementById('expenseChart').getContext('2d');
  const ctxInc = document.getElementById('incomeChart').getContext('2d');

  expenseChart = new Chart(ctxExp, {
    type: 'pie',
    data:{
      labels: labelsExpense ,
      datasets: [{
        label: 'Expenses',
        data: dataExpense,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Rs. ${context.raw}`;
            }
          }
        }
      }
    }
  });

  incomeChart = new Chart(ctxInc, {
    type: 'pie',
    data:{
      labels: labelsIncome ,
      datasets: [{
        label: 'Income',
        data: dataIncome,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Rs. ${context.raw}`;
            }
          }
        }
      }
    }
  });

}
