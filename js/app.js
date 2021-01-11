// Variables
const budgetDOM = document.querySelector('#total');
const restanteDOM = document.querySelector('#restante');
const restanteDiv = document.querySelector('.restante');
const errorDOM = document.querySelector('#error');
const form = document.querySelector('#agregar-gasto');
const inputExpense = document.querySelector('#gasto');
const inputAmount = document.querySelector('#cantidad');
const ulExpenses = document.querySelector('#gastos ul');

let budget;


// Classes
class Budget {
    constructor(amount) {
        this.amount = amount;
        this.left = amount;
        this.expenses = [];
        this.expensesList = [];
    };

    addExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.calculateLeftBudget();
    };

    deleteExpense(id, deleted) {
        const deletedItem = deleted[0];
        this.expenses = this.expenses.filter(expense => expense !== deletedItem.amount)
    };

    calculateLeftBudget() {
        const sumExpenses = this.expenses.reduce((acc, ex) => acc + ex, 0);
        this.left = this.amount - sumExpenses;
    };

};

class UI {
    printBudget(budget) {
        budgetDOM.textContent = `${budget.amount}.00`
        restanteDOM.textContent = `${budget.amount}.00`
    };

    updateList(expensesList) {
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

    updateBudget(left, budget) {
        if ((budget / 4) > left) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ((budget / 2) > left) {
            restanteDiv.classList.remove('alert-success', 'alert-danger');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }
        restanteDOM.textContent = `${left}.00`
    };


};

const ui = new UI();

// Listeners
const listeners = () => {
    document.addEventListener('DOMContentLoaded', getBudget);
    form.addEventListener('submit', addExpense);
};

// Functions
const addExpense = (e) => {
    e.preventDefault();
    if (inputExpense.value != '' && inputAmount.value != '') {
        // Generate an array of expenses object
        const newExpense = {
            description: inputExpense.value,
            amount: Number(inputAmount.value),
            id: Date.now()
        }
        budget.expensesList = [...budget.expensesList, newExpense]
        ui.expenseAddedConfirmation('Gasto agregado correctamente', 'correcto');
        ui.updateList(budget.expensesList);
        budget.addExpense(newExpense.amount)
        ui.updateBudget(budget.left, budget.amount);

    } else {
        // Queda pendiente la validación
        console.log('vacios');
    }

    inputAmount.value = '';
    inputExpense.value = '';
};

const deleteExpense = (e) => {
    const currentItemId = e.target.parentElement.dataset.id;
    const deleted = budget.expensesList.filter(expense => expense.id.toString() === currentItemId);
    budget.expensesList = budget.expensesList.filter(expense => expense.id.toString() !== currentItemId);

    ui.updateList(budget.expensesList);
    budget.deleteExpense(currentItemId, deleted);
    ui.updateBudget(budget.left, budget.amount);
}

const getBudget = () => {
    const enteredBudget = Number(prompt('¿Cuál es tu presupuesto?'));
    if (isNaN(enteredBudget) || enteredBudget <= 0) {
        window.location.reload();
    }
    budget = new Budget(enteredBudget);
    ui.printBudget(budget);
};


listeners();