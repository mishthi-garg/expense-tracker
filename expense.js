let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = JSON.parse(localStorage.getItem('total')) || 0;


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

const select = document.querySelector('select[name="Category"]');

categories.forEach(category => {
  select.innerHTML += `<option value="${category}">${category}</option>`;
});

loadExpenses();

function loadExpenses() {
    document.querySelector('.expense-list').innerHTML = '';
    for(let i=expenses.length-1; i>=0; i--){
        document.querySelector('.expense-list').innerHTML += `
        <p class="expense-label">${expenses[i].label}</p>
        <p class="category">${expenses[i].category}</p>
        <p> Rs. ${expenses[i].amount}</p>
        <p>${expenses[i].date}</p>
        <button class="js-delete-expense" onclick="deleteExpense(${i})">Delete</button>`;
      }
    document.querySelector('.js-total').innerHTML = `Total: Rs. ${total}`;

    generateChart();
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
      const dateInput = document.querySelector('.js-expense-date');
      const date = dateInput.value || new Date().toISOString().split('T')[0];
      const categorySelect = document.querySelector('select[name="Category"]');
      const category = categorySelect.value;

      const entry = {
        label: label,
        amount: amount,
        date: date,
        category: category
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
      total += amount;
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('total', JSON.stringify(total));
      loadExpenses();
      labelInput.value = '';
      updateCalculation('C');
    }

    function resetExpenses() {
      if (confirm('Are you sure you want to reset all expenses? This action cannot be undone.')) {
        expenses = [];
        total = 0;
        localStorage.removeItem('expenses');
        localStorage.removeItem('total');
        loadExpenses();
      }
    }