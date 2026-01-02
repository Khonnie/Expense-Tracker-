const input1 = document.getElementById('type');
const input2 = document.getElementById('expname');
const input3 = document.getElementById('amtname');
const table = document.getElementById('tab');
const addbutton = document.getElementById('addbtn');
const bal = document.getElementById('bal');
const Tny = document.getElementById('TNy');
const Texp = document.getElementById('Texp');

let Ny = 0;
let Exp = 0;
let Expenses = JSON.parse(localStorage.getItem('expense')) || [];
window.addEventListener('DOMContentLoaded', display)
function AddExpense(event) {
  event.preventDefault();
  
  const userSelectedType = input1.value;
  const userExpenseValue = input2.value.trim();
  const userAmountValue = Number(input3.value.trim());

  if (
    (userSelectedType === 'income' || userSelectedType === 'expense') &&
    userExpenseValue !== '' &&
    userAmountValue > 0
  ) {
    
    Expenses.push({
      type: userSelectedType,
      name: userExpenseValue,
      amount: userAmountValue
    });
    localStorage.setItem('expense', JSON.stringify(Expenses));
    display();
  }
}
  function display(){
    Expenses = JSON.parse(localStorage.getItem('expense')) || [];
    Ny=0;
    Exp=0;
    Expenses.forEach((expense, index) =>{
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.textContent = index + 1;

    const td2 = document.createElement('td');
    td2.textContent = expense.name;

    const td3 = document.createElement('td');
    td3.textContent = expense.amount;

    const td4 = document.createElement('td');
    if (expense.type === 'income') {
  td4.innerHTML = '<i class="fa-solid fa-circle-arrow-up" style="color:green;"></i>';
} else {
  td4.innerHTML = '<i class="fa-solid fa-circle-arrow-down" style="color:red;"></i>';
}
    //td4.textContent = userSelectedType;

    const td5 = document.createElement('td');
    td5.classList.add('actionbtn');
// Create Edit button
    const editbtn = document.createElement('button');
    editbtn.textContent = 'Edit';
    editbtn.addEventListener('click', () => {
    input2.value = expense.name;
    input3.value = expense.amount;
    input1.value = expense.type;

  // remove row after editing
  Expenses.splice(index, 1);
  localStorage.setItem('expense',JSON.stringify(Expenses));
  display();
});
// Create Delete button
  const delbtn = document.createElement('button');
  delbtn.textContent = 'Delete';

  delbtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete?')) {
  
    Expenses.splice(index, 1);
    localStorage.setItem('expense', JSON.stringify(Expenses));
    display();
  }
});
// Append buttons to td5
  td5.appendChild(editbtn);
  td5.appendChild(delbtn);

    tr.append(td1, td2, td3, td4, td5);
    table.appendChild(tr);

    // Update totals
    if (expense.type === 'income') {
      Ny += expense.amount;
      Tny.textContent = `UGX ${Ny}`;
    }

    if (expense.type === 'expense') {
      Exp += expense.amount;
      Texp.textContent = `UGX ${Exp}`;
    }

    bal.textContent = `UGX ${Ny - Exp}`;
    })
  }

addbutton.addEventListener('click', AddExpense);