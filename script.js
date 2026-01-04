// --- GET ELEMENTS --
const input1 = document.getElementById('type');
const input2 = document.getElementById('expname');
const input3 = document.getElementById('amtname');
const input4 = document.getElementById('date');
const addbutton = document.getElementById('addbtn');
const bal = document.getElementById('bal');
const Tny = document.getElementById('TNy');
const Texp = document.getElementById('Texp');
const tbody = document.getElementById('tbody');
const filterType = document.getElementById('entry'); 
const div = document.getElementById('total1');

let Ny = 0;
let Exp = 0;

// Load from localStorage
let Expenses = JSON.parse(localStorage.getItem('expense')) || [];

// - ADD EXPENSE---
function AddExpense() {
  const userSelectedType = input1.value;
  const userExpenseValue = input2.value.trim();
  const userAmountValue = Number(input3.value.trim());
  const userSelectedDate = input4.value;

  if (
    (userSelectedType === 'income' || userSelectedType === 'expense') &&
    userExpenseValue !== '' &&
    userAmountValue > 0 &&
    userSelectedDate !== ''
  ) {
    Expenses.push({
      type: userSelectedType,
      name: userExpenseValue,
      amount: userAmountValue,
      date: userSelectedDate
    });

    localStorage.setItem('expense', JSON.stringify(Expenses));

    // clear form/inputs
    input1.value = '';
    input2.value = '';
    input3.value = '';
    input4.value = '';

    applyFilter();
  }
}

// ---DISPLAY EXPENSES-------
function display(filteredExpenses = Expenses) {
  tbody.innerHTML = '';
  Ny = 0;
  Exp = 0;

  filteredExpenses.forEach((expense, index) => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.textContent = index + 1;

    const td2 = document.createElement('td');
    td2.textContent = expense.name;

    const td3 = document.createElement('td');
    td3.textContent = expense.amount;

    const td4 = document.createElement('td');
    td4.innerHTML =
      expense.type === 'income'
        ? '<i class="fa-solid fa-circle-arrow-up" style="color:green;"></i>'
        : '<i class="fa-solid fa-circle-arrow-down" style="color:red;"></i>';

    const td5 = document.createElement('td');
    td5.textContent = expense.date;

    const td6 = document.createElement('td');

    // Edit button
    const editbtn = document.createElement('button');
    editbtn.textContent = 'Edit';
    editbtn.addEventListener('click', () => {
      input2.value = expense.name;
      input3.value = expense.amount;
      input1.value = expense.type;
      input4.value = expense.date;

      Expenses.splice(index, 1);
      localStorage.setItem('expense', JSON.stringify(Expenses));

      applyFilter();
    });

    // Delete button
    const delbtn = document.createElement('button');
    delbtn.textContent = 'Delete';
    delbtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete?')) {
        Expenses.splice(index, 1);
        localStorage.setItem('expense', JSON.stringify(Expenses));
        applyFilter();
      }
    });

    td6.append(editbtn, delbtn);
    tr.append(td1, td2, td3, td4, td5, td6);
    tbody.appendChild(tr);

    if (expense.type === 'income') Ny += expense.amount;
    if (expense.type === 'expense') Exp += expense.amount;
  });

  Tny.textContent = `UGX ${Ny}`;
  Texp.textContent = `UGX ${Exp}`;
  bal.textContent = `UGX ${Ny - Exp}`;
}

// ------- FILTER----------------
function applyFilter() {
  const type = filterType.value;
  const span = document.createElement('span');
  div.innerHTML = '';
  let filtered;

  if (type === 'all') {
    filtered = Expenses;
  } else {
    filtered = Expenses.filter(exp => exp.type === type);
  }

  

  const total = filtered.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  span.textContent = `TOTAL: UGX ${total}`;
  div.appendChild(span);
  display(filtered);
}

// ------ EVENTS --------------------
addbutton.addEventListener('click', AddExpense);
filterType.addEventListener('change', applyFilter);

// ------INITIAL LOAD ---------------
window.addEventListener('DOMContentLoaded', applyFilter);