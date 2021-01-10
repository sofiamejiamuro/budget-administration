// Variables
let budget;
let expenses;
const budgetDOM = document.querySelector('#total');
const restanteDOM = document.querySelector('#restante');
const errorDOM = document.querySelector('#error');
const form = document.querySelector('#agregar-gasto');
const inputExpense = document.querySelector('#gasto');
const inputAmount = document.querySelector('#cantidad');


// Classes
class Budget {
    constructor(amount) {
        this.amount = amount;
    };
    // method to substract the budget
};

class Expenses {
    constructor(description, amount) {
        this.description = description;
        this.amount = amount;
    };
};

class UI {
    printBudget(budget) {
        console.log(budget);
        // PRINT BUDGET
        budgetDOM.textContent = `${budget.amount}.00`
        restanteDOM.textContent = `${budget.amount}.00`
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
        console.log('no estan vacios');
        expenses = new Expenses(inputExpense.value, inputAmount.value);
        console.log(expenses);

        ui.expenseAddedConfirmation('Gasto agregado correctamente', 'correcto')

    } else {
        // Queda pendiente la validación
        console.log('vacios');
    }

    inputAmount.value = '';
    inputExpense.value = '';
};

const getBudget = () => {
    // Get the Data
    const enteredBudget = Number(prompt('¿Cuál es tu presupuesto?'));
    if (isNaN(enteredBudget) || enteredBudget <= 0) {
        window.location.reload();
    }
    budget = new Budget(enteredBudget);
    console.log('budget', budget);

    ui.printBudget(budget);
};


listeners();