"use client";
import EntryForm from "@/components/EntryForm";
import SpendingLimit from "@/components/SpendingLimit";
import Summary from "@/components/Summary";
import { useEffect, useState } from "react";

interface Expense {
  name: string;
  desc: string;
  amount: number;
  time: string; // Time in "HH:MM" format
  date: string; // Date in "MM-DD-YYYY" format
}
function Home() {
  const [data, setData] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("expenses");
      if (saved) {
        const parsedData: Expense[] = JSON.parse(saved) || [];
        setData(parsedData);

        // Calculate total amount from saved data
        const total = parsedData.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setTotalAmount(total);
      }

      const savedData = localStorage.getItem("income");
      if (savedData) {
        setIncome(JSON.parse(savedData) || 0);
      }
    }
  }, []);

  // Handle form submission
  const handleFormSubmit = (newData: Expense[]) => {
    setData(newData);
    localStorage.setItem("expenses", JSON.stringify(newData));
  };
  // Handle income submission
  const handleIncomeSubmit = (newIncome: any) => {
    setIncome(newIncome);
    localStorage.setItem("income", JSON.stringify(newIncome));
  };
  return (
    <main className="bg-[#013B94] text-white min-h-screen">
      {/* heading */}
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-5xl">Track Your Expenses</h2>
        <h3 className="py-5 text-4xl">Spend Wisely</h3>
      </section>

      <section className="max-w-7xl mx-auto p-2">
        <div className="flex flex-row">
          {/* form */}
          <div className="basis-2/5">
            <EntryForm
              onSubmit={handleFormSubmit}
              onSubmitIncome={handleIncomeSubmit}
              incomeData={income}
            />
          </div>
          {/* summary */}
          <div className="basis-3/5">
            <Summary data={data} />
            <SpendingLimit income={income} totalAmount={totalAmount} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
