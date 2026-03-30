
let expenseChart = null;

function generateChart() {
  if (expenseChart) {
    expenseChart.destroy();
  }
  const categoryTotals ={};
  expenses.forEach(expense => {
    if(categoryTotals[expense.category]){
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  const ctx = document.getElementById('expenseChart').getContext('2d');

  expenseChart = new Chart(ctx, {
    type: 'pie',
    data:{
      labels: labels,
      datasets: [{
        label: 'Expenses',
        data: data,
        borderWidth: 1
      }]
    }
  });
}
