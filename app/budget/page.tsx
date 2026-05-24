"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  "Clothes",
  "Entertainment",
  "Food",
  "Gifts",
  "Personal",
  "School",
];

export default function BudgetPage() {
  const [spent, setSpent] = useState<Record<string, number>>({});
  const [budget, setBudget] = useState<Record<string, number>>({});

  const update = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    key: string,
    value: string
  ) => {
    setter((prev: any) => ({
      ...prev,
      [key]: Number(value) || 0,
    }));
  };

  const totalSpent = Object.values(spent).reduce((a, b) => a + (b || 0), 0);
  const totalBudget = Object.values(budget).reduce((a, b) => a + (b || 0), 0);

  return (
    <div className="p-10">
      <Link href="/">← Back</Link>

      <h1 className="text-3xl font-bold mt-4">Budget Tracker</h1>

      <table className="mt-6 w-full border">
        <thead>
          <tr>
            <th>Category</th>
            <th>Spent</th>
            <th>Budget</th>
            <th>Difference</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat}>
              <td>{cat}</td>

              <td>
                <input
                  type="number"
                  onChange={(e) =>
                    update(setSpent, cat, e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  onChange={(e) =>
                    update(setBudget, cat, e.target.value)
                  }
                />
              </td>

              <td>{(budget[cat] || 0) - (spent[cat] || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <p>Total Spent: {totalSpent}</p>
        <p>Total Budget: {totalBudget}</p>
        <p>Difference: {totalBudget - totalSpent}</p>
      </div>
    </div>
  );
}