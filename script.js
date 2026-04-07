// State Management
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// DOM Elements
const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const filterMonth = document.getElementById('filter-month');
const filterCategory = document.getElementById('filter-category');

// --- NEW: Radio Button Logic ---
const categorySelect = document.getElementById('category');
const typeRadios = document.querySelectorAll('input[name="type"]');

const categoryOptions = {
    expense: ['Food', 'Rent', 'Fun', 'Utilities', 'Other'],
    income: ['Salary', 'Freelance', 'Bonus', 'Other']
};

function updateCategoryDropdown() {
    // Find which radio button is currently checked
    const selectedType = document.querySelector('input[name="type"]:checked').value;
    categorySelect.innerHTML = ''; 
    categoryOptions[selectedType].forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.innerText = cat;
        categorySelect.appendChild(option);
    });
}

// Listen to both radio buttons for clicks
typeRadios.forEach(radio => radio.addEventListener('change', updateCategoryDropdown));
updateCategoryDropdown(); // Run once on load
// --------------------------------

// --- UPDATE FORM SUBMIT EVENT ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTransaction = {
        id: Date.now(),
        // Grab the value from the checked radio button instead of a select
        type: document.querySelector('input[name="type"]:checked').value,
        category: document.getElementById('category').value,
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    form.reset();
    updateCategoryDropdown(); // Reset the dropdown back to expense defaults
    updateUI();
});
// --------------------------------
