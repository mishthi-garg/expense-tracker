
let expenseChart = null;
let incomeChart = null;

let labelsExpense = [];
let dataExpense = [];

let labelsIncome = [];
let dataIncome = [];

let expenseBar = null;
let incomeBar = null;
let labelsExpenseBar = [];
let dataExpenseBar = [];
let labelsIncomeBar = [];
let dataIncomeBar = [];

function renderChart() {

  const expenseTotals ={};
  const incomeTotals ={};
  const expenseBarTotals = {};
  const incomeBarTotals = {};

  expenses.forEach(expense => {
    if(expense.expenseType === 'INCOME'){
        incomeTotals[expense.category] = (incomeTotals[expense.category] || 0) + expense.amount;
        incomeBarTotals[expense.account] = (incomeBarTotals[expense.account] || 0) + expense.amount;
    } else {
        expenseTotals[expense.category] = (expenseTotals[expense.category] || 0) + expense.amount;
        expenseBarTotals[expense.account] = (expenseBarTotals[expense.account] || 0) + expense.amount;
    }
  });
  labelsExpense = Object.keys(expenseTotals);
  dataExpense = Object.values(expenseTotals);
  labelsIncome = Object.keys(incomeTotals);
  dataIncome = Object.values(incomeTotals);
  labelsExpenseBar = Object.keys(expenseBarTotals);
  dataExpenseBar = Object.values(expenseBarTotals);
  labelsIncomeBar = Object.keys(incomeBarTotals);
  dataIncomeBar = Object.values(incomeBarTotals);
  
}


function generateChart() {
  if (expenseChart) {
    expenseChart.destroy();
  }
  if (incomeChart) {
    incomeChart.destroy();
  }
  if (expenseBar) {
    expenseBar.destroy();
  }
  if (incomeBar) {
    incomeBar.destroy();
  }

  renderChart();

  document.getElementById('chart-container').scrollIntoView({
    behavior: 'smooth'
  });

  if (labelsExpense.length === 0 && labelsIncome.length === 0) return;
  const ctxExp = document.getElementById('expenseChart').getContext('2d');
  const ctxInc = document.getElementById('incomeChart').getContext('2d');
  const ctxExpBar = document.getElementById('expenseBar').getContext('2d');

  
  expenseBar = new Chart(ctxExpBar, {
    type: 'bar',
    data: {
      labels: labelsExpenseBar ,
      datasets: [{
        label: 'Expenses',
        data: dataExpenseBar,
        backgroundColor: 'rgba(255, 0, 0, 0.25)',
        borderColor: 'red',
        borderWidth: 1
      },{
        label: 'Income',
        data: dataIncomeBar,
        backgroundColor: 'rgba(0, 255, 0, 0.25)',
        borderColor: 'green',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Distribution by Account',
          color: 'white',
          font: {
            size: 24
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 24
            },
            color: 'white'
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 24
            },
            color: 'white'
          }
        }
      }
    }
  });


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
        legend: {
          labels: {
            color: 'white',   
            font: {
              size: 24        
            }
          }
        },
        title:{
          display: true,
          text: 'Expense Distribution by Category',
          font:{
            size: 24
          },
          color: 'white'
        },
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
        legend: {
          labels: {
            color: 'white',   
            font: {
              size: 24        
            }
          }
        },
        title:{
          display: true,
          text: 'Income Distribution by Category',
          font:{
            size: 24
          },
          color: 'white'
        },
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
