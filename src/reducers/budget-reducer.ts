import { Category, Expense } from './../types/index';
import { DraftExpense } from "../types";
import { v4 as uuidv4 } from 'uuid';

export type BudgetAction =
    | { type: "add-budget"; payload: { budget: number } }
    | { type: "show-modal" }
    | { type: "close-modal" }
    | { type: "add-expense", payload:{expense:DraftExpense} }
    | { type: "delete-expense", payload:{id: Expense['id']} }
    | { type: "get-expense-by-id", payload:{id: Expense['id']} }
    | { type: "update-expense", payload:{expense: Expense} }
    | { type: "reset-expenses" }
    | { type: "add-filter-category", payload:{id: Category['id']} };

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id']
    currenCategory?: Category['id']
};

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem("budget");
    return localStorageBudget ? +localStorageBudget : 0;
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem("expenses");
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses:localStorageExpenses(),
    editingId: "", 
    currenCategory: ""
};

const createExpense = (expense: DraftExpense): Expense => {
    return {
        ...expense,
        id: uuidv4()
    };
}

export const budgetReducer = (
    state: BudgetState | undefined,
    action: BudgetAction,
): BudgetState => {
    const currentState = state ?? initialState;
    switch (action.type) {
        
        case "add-budget":
            return {
                ...currentState,
                budget: action.payload.budget
            };

        case "show-modal":
            return {
                ...currentState,
                modal: true
            };

        case "close-modal":
            return {
                ...currentState,
                modal: false,
                editingId: ""
            };
        
        case "add-expense":{
            const newExpense = createExpense(action.payload.expense);
            return {
                ...currentState,
                expenses: [...currentState.expenses, newExpense],
                modal: false
            };
        }
        case "delete-expense": {
            return {
                ...currentState,
                expenses: currentState.expenses.filter(expense => expense.id !== action.payload.id)
            };
        }
        case "get-expense-by-id":{
            return {
                ...currentState,
                editingId: action.payload.id,
                modal: true,

            }
        }
        case "update-expense": {
            return {
                ...currentState,
                expenses: currentState.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
                modal: false,
                editingId: ""
                
            }
        }
        case "reset-expenses": {
            return {
                ...currentState,
                expenses:[],
                budget: 0,
            }
        }
        case "add-filter-category":{
            return {
                ...currentState,
                currenCategory: action.payload.id
            }
        }

        default:
            return currentState;
    }
};
