// State Management
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// DOM Elements
const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const filterMonth = document.getElementById('filter-month');
const filterCategory = document.getElementById('filter-category');

// Update UI
function updateUI() {
    // Apply Filters
    const mFilter = filterMonth.value;
    const cFilter = filterCategory.value;

    const filtered = transactions.filter(t => {
        const monthMatch = mFilter === 'all' || t.date.split('-')[1] === mFilter;
        const categoryMatch = cFilter === 'all' || t.category === cFilter;
        return monthMatch && categoryMatch;
    });

    // Calculate Totals
    const income = filtered.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = filtered.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expense;

    // Render Totals with ₹ symbol
    document.getElementById('total-income').innerText = `+₹${income.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    document.getElementById('total-expense').innerText = `-₹${expense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    document.getElementById('balance').innerText = `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    // Render List
    list.innerHTML = '';
    filtered.forEach(t => {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        div.innerHTML = `
            <div class="t-info">
                <span class="t-title">${t.category}</span>
                <span class="t-date">${t.date}</span>
            </div>
            <div class="t-amount ${t.type === 'income' ? 'text-success' : 'text-danger'}">
                ${t.type === 'income' ? '+' : '-'}₹${t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                <button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// Add Transaction
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTransaction = {
        id: Date.now(),
        type: document.getElementById('type').value,
        category: document.getElementById('category').value,
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    form.reset();
    updateUI();
});

// Delete Transaction
window.deleteTransaction = function(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateUI();
}

// Event Listeners for Filters
filterMonth.addEventListener('change', updateUI);
filterCategory.addEventListener('change', updateUI);

// Initial Render
updateUI();
