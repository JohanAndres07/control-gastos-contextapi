import { categories } from "../data/categories"
import {useBudget} from "../hooks/useBudget"

export const FilterByCategory = () => {
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        dispatch({type:'add-filter-category', payload:{id:value}})
    }

  return (
    <div 
    className=" bg-white/20 shadow-lg rounded-lg p-10">
        <form action="">
            <div className="flex flex-col  md:flex-row md:items-cneter gap-5 font-kanit ">
                <label className="text-gray-600 text-2xl font-bold" htmlFor="category">Filtrar Gastos</label>
                <select 
                onChange={handleChange}
                name="" 
                id="category"
                className="bg-slate-100/30 p-2 flex-1 rounded-lg shadow-lg backdrop-blur-sm">
                    <option value="">Todas las categorias</option>
                    {categories.map(category => (
                        <option  key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
        </div>
  )
}
