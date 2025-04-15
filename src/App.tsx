import { useEffect, useMemo } from "react";
import { BudgetForm } from "./components/Budget/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import { BudgetTracker } from "./components/Budget/BudgetTracker";
import ExpenseModal from "./components/Expense/ExpenseModal";
import { ExpenseList } from "./components/Expense/ExpenseList";
import { FilterByCategory } from "./components/FilterByCategory";
import { motion } from "motion/react";
import { AuroraBackground } from "./components/ui/AuroraBackground";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => {
    return state.budget > 0;
  }, [state.budget]);


  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(state.budget));
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);

  return (
    <>
      <AuroraBackground className="min-h-screen overflow-x-hidden">
        <header className="py-6 w-full text-center">
          <h1 className="uppercase font-black text-3xl sm:text-5xl md:text-5xl text-zinc-600/30">
            Planificador de gastos
          </h1>
        </header>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col  xl:flex-row items-center  justify-center"
        >

          {isValidBudget ? <BudgetTracker /> : <BudgetForm />}

          {isValidBudget && (
            <main className="w-full max-w-5xl mx-auto xl:w-[50rem] xl:h-[33rem] bg-white/20 shadow-xl rounded-2xl mt-10 p-6 sm:p-8 md:p-10 backdrop-blur-sm border border-white/20">
              <FilterByCategory />
              <ExpenseList />
              <ExpenseModal />
            </main>
          )}

        </motion.div>
      </AuroraBackground>
    </>


  );
}

export default App;
