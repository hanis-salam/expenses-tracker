"use client";
import CategoryCard from "./CategoryCard";
import { useState, useEffect } from "react";
interface Expense {
  name: string;
  desc: string;
  amount: number;
  time: string; // Time in "HH:MM" format
  date: string; // Date in "MM-DD-YYYY" format
}
interface DisplayProps {
  data: Expense[];
}
const Summary: React.FC<DisplayProps> = ({ data }) => {
  const [food, setFood] = useState<Expense[]>([]);
  const [bill, setBill] = useState<Expense[]>([]);
  const [shop, setShop] = useState<Expense[]>([]);
  const [health, setHealth] = useState<Expense[]>([]);

  // Function to group the array by name
  function groupByNames(arr: Expense[]): Record<string, Expense[]> {
    return arr.reduce((acc, current) => {
      if (!acc[current.name]) {
        acc[current.name] = [];
      }
      acc[current.name].push(current);
      return acc;
    }, {} as Record<string, Expense[]>);
  }

  useEffect(() => {
    // let retrieveData: any = localStorage.getItem("expenses");
    let existing = data || [];
    const grouped = groupByNames(existing);
    setBill(grouped.Bill || []);
    setFood(grouped.Food || []);
    setShop(grouped.Shop || []);
    setHealth(grouped.Health || []);
  }, [data]);
  return (
    <section className="p-4">
      <div className="flex flex-row flex-wrap">
        <div className="basis-1/2">
          <CategoryCard
            data={food}
            categoryName={"Food"}
            iconName={"HandPlatter"}
          />
        </div>

        <div className="basis-1/2">
          <CategoryCard
            data={shop}
            categoryName={"Shopping"}
            iconName={"ShoppingBasket"}
          />
        </div>
        <div className="basis-1/2">
          <CategoryCard
            data={bill}
            categoryName={"Bills"}
            iconName={"Receipt"}
          />
        </div>

        <div className="basis-1/2">
          <CategoryCard
            data={health}
            categoryName={"Health"}
            iconName={"HeartPulse"}
          />
        </div>
      </div>
    </section>
  );
};

export default Summary;
