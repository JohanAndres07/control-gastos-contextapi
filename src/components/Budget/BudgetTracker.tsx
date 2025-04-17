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
		<div className="w-full max-w-4xl mt-10 p-6 lg:p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 bg-slate-100/30 flex flex-col gap-8 ">

			<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full justify-around">

				<div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-60 lg:h-60 flex-shrink-0 lg:ml-20 ">
					<div className="relative w-full h-full">
						<CircularProgressbar
							value={reiminigBudget}
							maxValue={state.budget}
							strokeWidth={8}
							text={''}
							styles={buildStyles({
								pathColor: color,
								textColor: 'transparent',
								trailColor: '#E5E7EB'
							})}
						/>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
							<div className="text-2xl font-bold" style={{ color }}>
								{percentage.toFixed(2)}%
							</div>
							<div className="text-lg" style={{ color }}>
								gastado
							</div>
						</div>
					</div>
				</div>

				<div className="w-full max-w-md flex flex-col gap-4 lg:gap-6 lg:mt-4">
					<AmountDisplay label="Presupuesto" amount={state.budget} />
					<AmountDisplay label="Disponible" amount={reiminigBudget} />
					<AmountDisplay label="Gastos" amount={totalExpenses} />
				</div>
			</div>

			<button
				type="button"
				className="bg-pink-600 w-full lg:w-auto lg:px-12 py-4 text-white uppercase font-bold rounded-3xl tracking-[.2em] hover:bg-pink-700 transition-all cursor-pointer"
				onClick={handleResetApp}
			>
				Resetear App
			</button>
		</div>
	);
};
