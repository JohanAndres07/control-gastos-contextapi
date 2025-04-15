import { useState, useMemo } from "react";
import { useBudget } from "../../hooks/useBudget";
import InputNumeric from "../ui/InputNumeric";


export const BudgetForm = () => {
	const [budget, setBudget] = useState(0);
	const { dispatch } = useBudget();

	const handleChange = (value: number) => {
		setBudget(value);
	  };
	  

	const isValid: boolean = useMemo(() => {
		return Number.isNaN(budget) || budget <= 0;
	}, [budget]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type: "add-budget", payload: { budget } });

	};


	return (
		<main
		className="p-10 mt-10 w-[30rem] bg-white/50 rounded-2xl shadow-xl backdrop-blur-sm border border-white/30 xl:w-[40rem]">
			<form className="space-y-5   " onSubmit={handleSubmit}>
				<div className="flex flex-col space-y-5 ">
					<label
						htmlFor="budget"
						className="text-4xl text-blue-600 font-bold text-center"
					>
						Definir presupuesto{" "}
					</label>
					<InputNumeric
					name="budget"
					handleChange={handleChange}
					budget={budget}/>
				</div>

				<input
					type="submit"
					className="w-full bg-blue-600 border-gray-200 p-2 cursor-pointer text-white font-bold disabled:opacity-10 rounded-3xl"
					placeholder="Define tu presuspuesto"
					name="budget"
					disabled={isValid}
				/>
			</form>

		</main>

	);
};
