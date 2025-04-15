import { useReducer, createContext, useMemo } from "react"
import type { Dispatch } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import type { BudgetAction, BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>,
    totalExpenses: number,
    reiminigBudget: number
}

type BudgetProviderProps = {
    children: React.ReactNode
}

const BudgetContext = createContext<BudgetContextProps | undefined>(undefined);

export { BudgetContext }; 


export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)


    const totalExpenses = useMemo(() => {
        return state.expenses.reduce((total, expense) => total + expense.amount, 0);
    }
        , [state.expenses]);


    const reiminigBudget = state.budget - totalExpenses;
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                reiminigBudget
            }}>
            {children}
        </BudgetContext.Provider>
    )
}