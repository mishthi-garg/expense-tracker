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
  'Other',
  'Rewards',
  'Refund',
  'Salary'
];
const accounts = ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'Mobile Payment', 'Other'];


const selectCatFilter = document.querySelector('#js-filter-category');
categories.forEach(category => {
  selectCatFilter.innerHTML += `<option value="${category}">${category}</option>`;
});
const selectAccFilter = document.querySelector('#js-filter-account');

accounts.forEach(account => {
  selectAccFilter.innerHTML += `<option value="${account}">${account}</option>`;
});

document.querySelector('#js-filter-type')
  .addEventListener('change', () => {
    console.log('TYPE CHANGED');
    loadExpenses();
  });

document.querySelector('#js-filter-category')
  .addEventListener('change', () => {
    console.log('CATEGORY CHANGED');
    loadExpenses();
  });

document.querySelector('#js-filter-account')
  .addEventListener('change', () => {
    console.log('ACCOUNT CHANGED');
    loadExpenses();
  });

function getFilteredData() {
  const typeFilter = document.querySelector('#js-filter-type').value;
  const categoryFilter = document.querySelector('#js-filter-category').value;
  const accountFilter = document.querySelector('#js-filter-account').value;

  return expenses.map((item,index) => ({...item, originalIndex: index})).filter(item => {
    const matchType = typeFilter === 'all' || item.expenseType === typeFilter;
    const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchAccount = accountFilter === 'all' || item.account === accountFilter;


    return matchType && matchCategory && matchAccount;
  });
}