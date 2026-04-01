let editIndex = null;

function openAddModal() {
  console.log('Opening add modal');
  const expenseTypeSelect = document.querySelector('.expense-type');
  expenseTypeSelect.querySelector('button:nth-child(2)').classList.add('active');
  expenseTypeSelect.querySelector('button:nth-child(1)').classList.remove('active');
  document.querySelector('.js-expense-date').value = new Date().toISOString().split('T')[0];
  document.querySelector('.js-expense-label').value = '';
  updateCalculation('C');
  document.getElementById("editModal").style.display = "block";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

function openEditModal(index) {
  editIndex = index;

  if(expenses[editIndex].expenseType === 'EXPENSE'){
        total -= expenses[editIndex].amount;
      } else{
        totalIncome -= expenses[editIndex].amount;
      }

  const expense = expenses[index];
  console.log('Opening edit modal');
  const expenseTypeSelect = document.querySelector('.expense-type');
  expenseTypeSelect.querySelector('button:nth-child(2)').classList.add('active');
  expenseTypeSelect.querySelector('button:nth-child(1)').classList.remove('active');
  document.querySelector('.js-expense-label').value = expense.label;
  document.querySelector('.js-expression').value = expense.amount;
  document.getElementById("editModal").style.display = "block";
  const dateInput = document.querySelector('.js-expense-date');
  dateInput.value = expense.date;
  const categorySelect = document.querySelector('select[name="Category"]');
  categorySelect.value = expense.category;
  const accountSelect = document.querySelector('select[name="Account"]');
  accountSelect.value = expense.account;

  save = document.querySelector('.Add-btn');
  save.innerHTML = 'Save';
  save.onclick = function() {
    expenses[editIndex].label = document.querySelector('.js-expense-label').value;
    expenses[editIndex].amount = Number(document.querySelector('.js-expression').value.trim());
    expenses[editIndex].date = document.querySelector('.js-expense-date').value;
    expenses[editIndex].expenseType = document.querySelector('.expense-type .active').textContent.trim();
    expenses[editIndex].category = document.querySelector('select[name="Category"]').value;
    expenses[editIndex].account = document.querySelector('select[name="Account"]').value;

    if(expenses[editIndex].expenseType === 'EXPENSE'){
        total += expenses[editIndex].amount;
      } else{
        totalIncome += expenses[editIndex].amount;
      }
    
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('total', JSON.stringify(total));
      localStorage.setItem('totalIncome', JSON.stringify(totalIncome));
      loadExpenses();
      closeModal();
  }

  document.getElementById("editModal").style.display = "block";
}

function cancelExpense() {
  document.getElementById("editModal").style.display = "none";
}
