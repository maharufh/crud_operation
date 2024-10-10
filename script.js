// Array to store the expenses
let expenses = [];

document.getElementById('startBtn').addEventListener('click', function () {
    document.getElementById('expenseForm').classList.remove('hidden');
});

document.getElementById('addExpenseBtn').addEventListener('click', function () {
    const productName = document.getElementById('productName').value;
    const productAmount = document.getElementById('productAmount').value;

    if (productName && productAmount) {
        addExpenseToList(productName, productAmount);
        clearInputFields();
    }
});

function addExpenseToList(name, amount) {
    const expenseList = document.getElementById('expenseList');

    // Creating new expense list item
    const listItem = document.createElement('li');
    listItem.classList.add('expense-item');
    
    const itemText = document.createElement('span');
    itemText.textContent = `${name}: $${amount}`;
    
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', function () {
        editExpense(listItem, name, amount);
    });

    // Update button
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.classList.add('update');
    updateBtn.addEventListener('click', function () {
        updateExpense(listItem);
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
        deleteExpense(listItem);
    });

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () {
        expenseList.removeChild(listItem);
        removeExpenseFromArray(name);
    });

    // Appending all buttons to the list item
    listItem.appendChild(itemText);
    listItem.appendChild(editBtn);
    listItem.appendChild(updateBtn);
    listItem.appendChild(deleteBtn);
    listItem.appendChild(removeBtn);

    // Adding the new item to the expense list
    expenseList.appendChild(listItem);

    // Adding the expense to the array
    expenses.push({ name, amount });
    console.log(expenses);
}

function clearInputFields() {
    document.getElementById('productName').value = '';
    document.getElementById('productAmount').value = '';
}

function editExpense(listItem, name, amount) {
    const newName = prompt('Edit Product Name:', name);
    const newAmount = prompt('Edit Amount:', amount);

    if (newName && newAmount) {
        listItem.querySelector('span').textContent = `${newName}: $${newAmount}`;
        updateExpenseInArray(name, newName, newAmount);
    }
}

function updateExpense(listItem) {
    const name = prompt('Update Product Name:');
    const amount = prompt('Update Amount:');
    if (name && amount) {
        listItem.querySelector('span').textContent = `${name}: $${amount}`;
        updateExpenseInArray(name, name, amount);
    }
}

function deleteExpense(listItem) {
    listItem.querySelector('span').textContent = '';
}

function removeExpenseFromArray(name) {
    expenses = expenses.filter(expense => expense.name !== name);
    console.log(expenses);
}

function updateExpenseInArray(oldName, newName, newAmount) {
    const index = expenses.findIndex(expense => expense.name === oldName);
    if (index > -1) {
        expenses[index].name = newName;
        expenses[index].amount = newAmount;
        console.log(expenses);
    }
}
