import { useMemo } from "react"
import { useBudget } from "../../hooks/useBudget"
import { ExpenseDetails } from "./ExpenseDetails"

export const ExpenseList = () => {
    const { state } = useBudget()
    
    const filteredExpenses = state.currenCategory? state.expenses.filter(expense => expense.category === state.currenCategory) : state.expenses

    const isEmpty = useMemo(() => {
        return filteredExpenses.length === 0
    }
    , [filteredExpenses])
    return (
    <div
    className="mt-10">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>:(<>
        <p className="text-gray-600 text-2xl font-bold my-5">Lista de gastos</p>
         {filteredExpenses.map(expense => (
            <ExpenseDetails key={expense.id} 
            expense={expense} />))
        }</>)}
    </div>
  )
}
