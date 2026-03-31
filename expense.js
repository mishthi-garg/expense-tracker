let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = JSON.parse(localStorage.getItem('total')) || 0;
let totalIncome = JSON.parse(localStorage.getItem('totalIncome')) || 0;


const categories = [
  'Beauty',
  'Car',
  'Education',
  'Electronics',
  'Entertainment',
  'Food',
  'Home',
  'Health',
  'Insurance',
  'Laundry',
  'Shopping',
  'Social',
  'Sports',
  'Tax',
  'Travel',
  'Other'
];

const accounts = ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'Mobile Payment', 'Other'];

const selectCat = document.querySelector('select[name="Category"]');

categories.forEach(category => {
  selectCat.innerHTML += `<option value="${category}">${category}</option>`;
});

const selectAcc = document.querySelector('select[name="Account"]');

accounts.forEach(account => {
  selectAcc.innerHTML += `<option value="${account}">${account}</option>`;
});

loadExpenses();

function loadExpenses() {
    if (expenses.length === 0) {
      document.querySelector('.expense-list').innerHTML = '<p>No expenses yet</p>';
      return;
    }
    let html = '';
    for(let i=expenses.length-1; i>=0; i--){
        html += `
        <p class="expense-label">${expenses[i].label}</p>
        <p class="category">${expenses[i].category}</p>
        <p class="amount-${expenses[i].expenseType}"> Rs. ${expenses[i].amount}</p>
        <p class="account">${expenses[i].account}</p>
        <p>${expenses[i].date}</p>
        <button class="js-delete-expense" onclick="deleteExpense(${i})">Delete</button>`;
      }
    document.querySelector('.expense-list').innerHTML = html;
    document.querySelector('.js-total').innerHTML = `Total Expense: <span class="amount-EXPENSE">Rs. ${total}</span>`;
    document.querySelector('.js-total-income').innerHTML = `Total Income: <span class="amount-INCOME">Rs. ${totalIncome}</span>`;

    const balance = totalIncome - total;
    document.querySelector('.js-balance').innerHTML =
      `Balance: <span class="amount-balance">Rs. ${balance}</span>`;
    renderChart();
    }

    function handleKeyDownLabel(event){
      if(event.key === 'Enter'){
        addExpense();
      }
    }

    function deleteExpense(index) {

      if(expenses[index].expenseType === 'EXPENSE'){
        total-= expenses[index].amount;
      } else{
        totalIncome -= expenses[index].amount;
      }
      expenses.splice(index, 1);
       
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('total', JSON.stringify(total));
      loadExpenses();
    }

    function toggleExp(){
      const expenseTypeSelect = document.querySelector('.expense-type');
      const incomeBtn = expenseTypeSelect.querySelector('button:nth-child(1)');
      const expenseBtn = expenseTypeSelect.querySelector('button:nth-child(2)');
      incomeBtn.classList.toggle('active');
      expenseBtn.classList.toggle('active');
    }

    function addExpense() {
      const labelInput = document.querySelector('.js-expense-label');
      const label = labelInput.value.trim();
      calculation = document.querySelector('.js-expression').value;
      if (!justEvaluated) {
        updateCalculation('=');
      }
      const amount = Number(document.querySelector('.js-expression').value.trim());
      const dateInput = document.querySelector('.js-expense-date');
      const date = dateInput.value || new Date().toLocaleDateString();
      const categorySelect = document.querySelector('select[name="Category"]');
      const category = categorySelect.value;
      const accountSelect = document.querySelector('select[name="Account"]');
      const account = accountSelect.value;
      const expenseTypeSelect = document.querySelector('.expense-type');
      const expenseType = expenseTypeSelect.querySelector('button:nth-child(1)').classList.contains('active') ? 'INCOME' : 'EXPENSE';

      const entry = {
        label: label,
        amount: amount,
        date: date,
        category: category,
        expenseType: expenseType ,
        account: account
      };
      if (label === '') {
        alert('Please enter a valid label for the expense.');
        return;
      }
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive number for the amount.');
        return;
      }
      expenses.push(entry);
      if(expenseType === 'EXPENSE'){
        total += amount;
      } else{
        totalIncome += amount;
      }
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('total', JSON.stringify(total));
      localStorage.setItem('totalIncome', JSON.stringify(totalIncome));
      loadExpenses();
      labelInput.value = '';
      updateCalculation('C');
    }

    function resetExpenses() {
      if (confirm('Are you sure you want to reset all expenses? This action cannot be undone.')) {
        expenses = [];
        total = 0;
        totalIncome = 0;
        localStorage.removeItem('expenses');
        localStorage.removeItem('total');
        localStorage.removeItem('totalIncome');
        loadExpenses();
      }
    }

    function cancelExpense(){
      const labelInput = document.querySelector('.js-expense-label');
      labelInput.value = '';
      updateCalculation('C');
    }