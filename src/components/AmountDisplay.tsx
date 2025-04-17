import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
	label: string;
	amount: number;
};

export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
	return (
		<div className={`flex flex-col  ${label ? "bg-slate-100/20 rounded-lg shadow-xl border border-slate-400/20 backdrop-blur-lg p-5" : "p-2"} min-w-[5rem] w-full max-w-xs overflow-hidden`}>
		<p className={`text-xl uppercase font-bold font-kanit ${label ? "text-black" : "text-gray-800 p-2"} w-full`}>
		  {label && (
			<span className="block text-gray-600 text-sm mb-1 truncate">
			  {label}
			</span>
		  )}
		  <span className={`font-kanit ${label ? "text-3xl" : "text-sm"} w-full break-all`}>
			{formatCurrency(amount)}
		  </span>
		</p>
	  </div>
	);

};
