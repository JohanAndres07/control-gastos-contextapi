import { AmountDisplay } from "../AmountDisplay";
import { useBudget } from "../../hooks/useBudget";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetTracker = () => {

	const { state, totalExpenses, reiminigBudget, dispatch } = useBudget();

	const percentage = (totalExpenses / state.budget) * 100;
	const color = percentage < 50 ? '#3b82f6' : '#DC2626';

	const handleResetApp = () => {
		localStorage.clear();
		dispatch({ type: 'reset-expenses' });
	}

	return (
		<div className="w-full max-w-4xl mx-auto mt-10 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 bg-slate-100/30 flex flex-col gap-8">
			
			<div className="flex flex-col md:flex-row items-center justify-center gap-8">
				
				{/* Circular Progress Bar */}
				<div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72">
					<CircularProgressbar
						value={reiminigBudget}
						maxValue={state.budget}
						text={`${percentage.toFixed(2)}% gastado`}
						strokeWidth={8}
						styles={buildStyles({
							pathColor: color,
							textColor: color,
							textSize: '12px',
							trailColor: '#E5E7EB',
						})}
					/>
				</div>

				{/* Budget Info */}
				<div className="w-full max-w-md flex flex-col gap-4">
					<AmountDisplay label="Presupuesto" amount={state.budget} />
					<AmountDisplay label="Disponible" amount={reiminigBudget} />
					<AmountDisplay label="Gastos" amount={totalExpenses} />
				</div>
			</div>

			{/* Reset Button */}
			<button
				type="button"
				className="bg-pink-600 w-full py-4 text-white uppercase font-bold rounded-3xl tracking-[.2em] hover:bg-pink-700 transition-all cursor-pointer"
				onClick={handleResetApp}
			>
				Resetear App
			</button>
		</div>
	);
};
