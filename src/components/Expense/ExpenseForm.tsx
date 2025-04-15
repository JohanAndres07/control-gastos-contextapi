import { useEffect, useState } from "react";
import type { DraftExpense } from "../../types/index"
import { categories } from "../../data/categories"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage } from "../ErrorMessage";
import {useBudget} from "../../hooks/useBudget"

export const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const [error , setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0)
  const {dispatch, state, reiminigBudget} = useBudget();

  useEffect(() => {
    if(state.editingId){
      const expenseToEdit = state.expenses.filter(expense => expense.id === state.editingId)[0]
      setExpense(expenseToEdit)
      setPreviousAmount(expenseToEdit.amount)
    }
  },[state.editingId, state.expenses])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountOrCategory = ['amount'].includes(name);
    setExpense({ ...expense, [name]:isAmountOrCategory ? +value: value });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    if ((expense.amount - previousAmount) > reiminigBudget) {
      setError('El gasto no puede ser mayor al presupuesto')
      return
    }


    if(state.editingId){
      dispatch({type:'update-expense', payload:{expense:{id:state.editingId, ...expense}}})
    }else{
      dispatch({type:'add-expense', payload:{expense}})
    }

    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })
    setPreviousAmount(0)
  
  }
  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}>
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 ">{state.editingId ? "Editando Gasto" :"Nuevo Gasto"}</legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div
        className="flex flex-col gap-2">
        <label
          htmlFor="expenseName"
          className="text-xl ">Nombre de gasto:</label>
        <input type="text"
          id="expenseName"
          placeholder="Añada el Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={(e) => handleChange(e)}
        />

      </div>
      <div
        className="flex flex-col gap-2">
        <label
          htmlFor="expenseCantidad"
          className="text-xl ">Cantidad:</label>
        <input type="text"
          id="expenseCantidad"
          placeholder="Añada la cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div
        className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xl ">Nombre de gasto:</label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={(e) => handleChange(e)}>
          <option value="">Seleccione</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id} >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div
        className="flex flex-col gap-2">
        <label
          htmlFor="datePicker"
          className="text-xl ">Fecha Gasto:</label>
        <DatePicker
          showIcon
          id="datePicker"
          selected={expense.date}
          onChange={(date) => setExpense({ ...expense, date: date! })}
          dateFormat="dd/MM/yyyy"
          className="bg-slate-100 p-2"
          name="datePicker"
        >
        </DatePicker>
      </div>
      <input type="submit" value={state.editingId ? "Guardar Cambios" :"Registrar Gasto"}
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
    </form>
  )
}

