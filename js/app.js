// Variables
const budgetDOM = document.querySelector('#total');
const restanteDOM = document.querySelector('#restante');
const restanteDiv = document.querySelector('.restante');
const errorDOM = document.querySelector('#error');
const form = document.querySelector('#agregar-gasto');
const inputExpense = document.querySelector('#gasto');
const inputAmount = document.querySelector('#cantidad');
const ulExpenses = document.querySelector('#gastos ul');

let expensesList = [];
let expensesAmount = 0;

// Classes
class Budget {
    constructor(amount) {
        this.amount = amount;
        this.restante = amount;
    };

    printBudget() {
        // PRINT BUDGET
        budgetDOM.textContent = `${this.amount}.00`
        restanteDOM.textContent = `${this.amount}.00`
    };

    updateBudget(newExpensesAmount) {


        const budgetWarning = (this.amount / 100) * 50;
        const budgetAlert = (this.amount / 100) * 75;
        if (newExpensesAmount > budgetAlert) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if (newExpensesAmount > budgetWarning) {
            restanteDiv.classList.remove('alert-success', 'alert-danger');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        restanteDOM.textContent = `${this.amount - newExpensesAmount}.00`

    };

    calculateBudget() {

    }

};

class Expenses {
    constructor(description, amount, id) {
        this.description = description;
        this.amount = amount;
        this.id = id;
    };

    expenseAddedConfirmation(message, type) {
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert');
        if (type === 'error') {
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }
        divMessage.textContent = message;
        document.querySelector('.primario').insertBefore(divMessage, form);
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
        }, 3000);
    };

    addExpenseToList(expensesList) {
        while (ulExpenses.firstChild) {
            ulExpenses.removeChild(ulExpenses.firstChild)
        };
        expensesList.forEach(element => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.dataset.id = element.id;
            listItem.innerHTML = `
                ${element.description}
                <span class="badge badge-primary badge-pill">$ ${element.amount}</span>
            `;
            const btnDelete = document.createElement('button');
            btnDelete.addEventListener('click', deleteExpense);
            btnDelete.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnDelete.textContent = 'Borrar';
            listItem.appendChild(btnDelete);
            ulExpenses.appendChild(listItem);
        });

    };

};

// Listeners
const listeners = () => {
    document.addEventListener('DOMContentLoaded', getBudget);
    form.addEventListener('submit', addExpense);
};



// Functions
const addExpense = (e) => {
    e.preventDefault();
    if (inputExpense.value != '' && inputAmount.value != '') {
        const newExpense = new Expenses(inputExpense.value, inputAmount.value, Date.now());
        newExpense.expenseAddedConfirmation('Gasto agregado correctamente', 'correcto');
        expensesList = [...expensesList, newExpense];
        newExpense.addExpenseToList(expensesList);
        expensesAmount += Number(newExpense.amount);
        budget.updateBudget(expensesAmount);

    } else {
        // Queda pendiente la validación
        console.log('vacios');
    }

    inputAmount.value = '';
    inputExpense.value = '';
};


const deleteExpense = (e) => {
    const currentItemId = e.target.parentElement.dataset.id;
    expensesList = expensesList.filter(expense => expense.id.toString() !== currentItemId);
    newExpense.addExpenseToList(expensesList);
}

const getBudget = () => {
    const enteredBudget = Number(prompt('¿Cuál es tu presupuesto?'));
    if (isNaN(enteredBudget) || enteredBudget <= 0) {
        window.location.reload();
    }
    const budget = new Budget(enteredBudget);
    budget.printBudget();
};


listeners();