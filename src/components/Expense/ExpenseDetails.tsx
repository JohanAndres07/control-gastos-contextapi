import { Expense } from "../../types"
import { formatDate } from "../../helpers";
import { AmountDisplay } from "../AmountDisplay";
import { useMemo } from "react";
import { categories } from "../../data/categories";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../../hooks/useBudget";


type ExpenseDetailsProps = {
    expense: Expense;
};


export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {

    const categoryInfo = useMemo(() => {
        return categories.filter(category => category.id === expense.category)[0]
    }, [expense])

    const { dispatch } = useBudget()
    
    const leadingActions = () => {
        return (
            <LeadingActions>
                <SwipeAction onClick={() => dispatch({type: "get-expense-by-id", payload: {
                    id:expense.id
                }})}>
                    Actualizar
                </SwipeAction>
            </LeadingActions>
        )
    }

    const trailingActions = () => {
        return (
            <TrailingActions>
                <SwipeAction onClick={() => dispatch({type: "delete-expense", payload: {id: expense.id}})}
                    destructive={true}>
                    Eliminar
                    
                </SwipeAction>
            </TrailingActions>
        )
    }

    return (
        <SwipeableList>
            <SwipeableListItem 
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}>
                
                <div className=" bg-white/20  p-10 w-full flex gap-5 items-center   shadow-lg backdrop-blur-sm  border-b border-gray-300 cursor-pointer select-none">
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xl font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p className="text-salte-900 text-lg font-black text-slate-700">{expense.expenseName}</p>
                        <p className="text-salte-600 text-sm"> {formatDate(new Date(expense.date))}</p>
                    </div>
                    <AmountDisplay
                        amount={expense.amount}
                        label=""
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
