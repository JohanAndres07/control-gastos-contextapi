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
                <SwipeAction onClick={() => dispatch({
                    type: "get-expense-by-id", payload: {
                        id: expense.id
                    }
                })}>
                    Actualizar
                </SwipeAction>
            </LeadingActions>
        )
    }

    const trailingActions = () => {
        return (
            <TrailingActions>
                <SwipeAction onClick={() => dispatch({ type: "delete-expense", payload: { id: expense.id } })}
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
                trailingActions={trailingActions()}
            >
                <div className="bg-white/20 p-4 w-full flex  lg:flex-row items-center shadow-lg backdrop-blur-sm border-b border-gray-300 cursor-pointer select-none ">
                  
                    <div className="flex items-center w-full">
                        
                        <div className="flex-shrink-0 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-[color] flex items-center justify-center mr-4">
                            <img
                                src={`icono_${categoryInfo.icon}.svg`}
                                alt="icono gasto"
                                className="w-10 h-10 lg:w-15 lg:h-15 object-contain"
                            />
                        </div>

                        
                        <div className=" flex flex-col  lg:items-center l">
                           
                            <div className="flex flex-col  lg:items-center ">
                                <p className="text-sm lg:text-base font-bold uppercase text-slate-500">
                                    {categoryInfo.name}
                                </p>
                                <p className="text-slate-700 text-sm lg:text-base font-medium lg:font-semibold">
                                    {expense.expenseName}
                                </p>
                            </div>

                            
                            <p className="text-slate-600 text-xs lg:text-sm mt-1 lg:mt-0">
                                {formatDate(new Date(expense.date))}
                            </p>
                        </div>

                    
                        <div className="flex lg:ml-auto">
                            <AmountDisplay
                                amount={expense.amount}
                                label=""
                            />
                        </div>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
