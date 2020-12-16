// All DOM elements
const selectCurrency = document.getElementById('select-currency');
const addBox =  document.querySelector('.add');
const formContainer = document.querySelector('.form-container');
const transactionsContainer = document.querySelector('.trasaction-container');
const submitButton = document.getElementById('submit');
// All variables
// required
let totalIncome = 0;
let totalExpenses = 0;
let expensePercentage = 0;
let totalBalance = 0;
let balancePercentage = 0;
// need to be stored
let transactions = localStorage.getItem('transactions') != null ? JSON.parse( localStorage.getItem('transactions')) : [];


//All Functions
// 1 - Function to display currency
function changeCurrency() {
    localStorage.setItem('currency',selectCurrency.value);
    selectCurrency.value = localStorage.getItem('currency');
    document.querySelectorAll('.currency').forEach(item => item.innerText = selectCurrency.value);
}

// 2 - Function to display form
function showForm() {
    const formDescription = document.getElementById('description');
    const formAmount = document.getElementById('amount');
    formDescription.value = "";
    formAmount.value = "";
    formContainer.classList.add('show');
}

// 3 - Function to  display transactions
function displayTransactions() {
    if (transactions.length != 0 ) {
        transactionsContainer.innerHTML =  "";
        transactions.forEach(element => {
            transactionsContainer.innerHTML += `<div class="transaction" id="${element.id}"><div class="bar ${element.type}"><div><p class="transaction-description">${element.description}</p></div><div><p class="currency bar-currency">PKR</p><p class="transaction-amount">${printAmount(element.amount.toFixed(2))}</p></div></div><button class="cancel" id="${element.id}-cancel">x</button></div>`;
        })
        changeCurrency();
        // saving data to localStorage
        localStorage.setItem('transactions',JSON.stringify(transactions));
    } else {
        transactionsContainer.innerHTML =  `<p>No transactions have taken place yet</p>`;
    }
}

// 4 - Function to add and display new transaction
function addNewTransaction(e) {
    e.preventDefault();
    const formDescription = document.getElementById('description');
    const formAmount = document.getElementById('amount');
    const incomeButton = document.getElementById('income-radio');
    const expensesButton = document.getElementById('expenses-radio');
    
    if (expensesButton.checked && (+formAmount.value + totalExpenses) > totalBalance) {
        alert("You don't have that much balance");
    } else {
        if ( formDescription.value.trim() == "" || formAmount.value.trim() == "") {
            alert('Some credentials are missing');
        } else {
            transactions.push({
                id:transactions.length === 0 ? 1 : transactions[transactions.length - 1].id + 1,
                type: incomeButton.checked ? incomeButton.value : expensesButton.value ,
                description: capitalize(formDescription.value.trim()),
                amount: +formAmount.value,
            });
            formContainer.classList.remove('show');
        }
        displayTransactions();
        calculateAmountsAndDisplay();
    }
}

// 5 - Function to calculate and display total amounts 
function calculateAmountsAndDisplay() {
    // all calculations
    const root = document.documentElement;
    totalIncome = 0;
    totalExpenses = 0;
    expensePercentage = 0;
    totalBalance = 0;
    balancePercentage = 0;
    if ( transactions.length != 0 ) {
        transactions.forEach( item => {
            item.type === 'income' ? totalIncome += item.amount : false;
            item.type === 'expenses' ? totalExpenses += item.amount : false;
        } )

        totalBalance = totalIncome - totalExpenses;
        expensePercentage = (( totalExpenses * 100 ) / totalIncome).toFixed(0);
        balancePercentage = (( totalBalance * 100 ) / totalIncome).toFixed(0);
    }
    
    // display on UI
    const balanceDOM = document.getElementById('total-balance-amount');
    const incomeDOM = document.getElementById('total-income-amount');
    const expensesDOM = document.getElementById('total-expenses-amount');
    const balancePercentageDOM = document.getElementById('balance-percentage');
    const expensePercentageDOM = document.getElementById('expenses-percentage');

    balanceDOM.innerText = printAmount(totalBalance.toFixed(2));
    incomeDOM.innerText = printAmount(totalIncome.toFixed(2));
    expensesDOM.innerText = printAmount(totalExpenses.toFixed(2));
    balancePercentageDOM.innerText = balancePercentage;
    expensePercentageDOM.innerText = expensePercentage;
    root.style.setProperty('--percentage-balance',balancePercentage);
    root.style.setProperty('--percentage-expenses',expensePercentage);
}

// 6 - Function to print regex of money
function printAmount(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//  7 - Fucntion to cancel transaction
function showAndCancelTransaction(e) {
    if ( e.target.className === 'bar income' || e.target.className === 'bar expenses') {
        // let transactionID = e.path.filter(item => item.className === 'transaction')[0].id;
        // let cancelButton = document.getElementById(`${transactionID}-cancel`);
        // cancelButton.classList.add('show');
    } else if ( e.target.className === 'cancel') {
        const id = +e.target.id.split("-")[0];
        if  ((transactions.filter( (item) => item.id == id)[0].type === 'income') && (totalBalance - transactions.filter( (item) => item.id == id)[0].amount) < totalExpenses) {
            alert('Remove some of your expenses first');
        } else {
            transactions = transactions.filter( (item) => item.id != id);
        }
    }
    displayTransactions();
    calculateAmountsAndDisplay();
}

// 8 - Function to capitalize any string
function capitalize(string) {
    return string.slice(0,1).toUpperCase() + string.slice(1,string.length);
}

// All event  listeners
// 1 - choose currency to display
selectCurrency.addEventListener('change',changeCurrency);
// 2 - click add box to show form
addBox.addEventListener('click',showForm);
// 3 - click submit button on form to have data
submitButton.addEventListener('click',addNewTransaction);
// 4 - click other than form will remove it
formContainer.addEventListener('click',(e) => e.target.className === "form-container show" ? formContainer.classList.remove('show'): false);
// 5 - click cancel to cancel transaction
transactionsContainer.addEventListener('click',showAndCancelTransaction);

// Init functions
// Saving Currency data and displaying
localStorage.getItem('currency') != null ? selectCurrency.value = localStorage.getItem('currency') ? localStorage.getItem('currency'):false : localStorage.setItem('currency',selectCurrency.value);
changeCurrency();
displayTransactions();
calculateAmountsAndDisplay();