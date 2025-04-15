import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
	label: string;
	amount: number;
};

export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
	return (
		<div className={` ${label ? "bg-slate-100/20 rounded-lg shadow-xl border border-slate-400/20 backdrop-blur-lg backdrop-opacity-[.001rem] p-5 ":"p-2" } flex flex-col  justify-center mt-2 `}>
			<p className="text-xl uppercase flex flex-col text-black font-bold font-kanit ">
				{`${label} `}
				<span className={`font-kanit ${label ?"text-gray-600 text-3xl font-bold" :"text-lg" } font-bold`}>{formatCurrency(amount)}</span>
			</p>
		</div>
	);
};
