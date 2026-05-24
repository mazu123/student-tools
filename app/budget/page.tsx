"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Category =
  | "clothes"
  | "entertainment"
  | "food"
  | "gifts"
  | "personal"
  | "school";

const categories: Category[] = [
  "clothes",
  "entertainment",
  "food",
  "gifts",
  "personal",
  "school",
];

type BudgetState = Record<Category, number>;

export default function Budget() {
  const [spent, setSpent] = useState<BudgetState>({
    clothes: 0,
    entertainment: 0,
    food: 0,
    gifts: 0,
    personal: 0,
    school: 0,
  });

  const [budget, setBudget] = useState<BudgetState>({
    clothes: 0,
    entertainment: 0,
    food: 0,
    gifts: 0,
    personal: 0,
    school: 0,
  });

  // ----------------------------
  // LOAD SAVED DATA
  // ----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("budget");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (parsed?.spent) setSpent(parsed.spent);
      if (parsed?.budget) setBudget(parsed.budget);
    } catch {
      // fail silently but safely
    }
  }, []);

  // ----------------------------
  // AUTO SAVE (SAFE GUARANTEE)
  // ----------------------------
  useEffect(() => {
    try {
      localStorage.setItem(
        "budget",
        JSON.stringify({ spent, budget })
      );
    } catch {
      // avoid breaking UI if storage fails
    }
  }, [spent, budget]);

  // ----------------------------
  // UPDATE HELPERS
  // ----------------------------
  const updateSpent = (cat: Category, value: number) => {
    setSpent((prev) => ({ ...prev, [cat]: value }));
  };

  const updateBudget = (cat: Category, value: number) => {
    setBudget((prev) => ({ ...prev, [cat]: value }));
  };

  // ----------------------------
  // TOTALS
  // ----------------------------
  const totalSpent = Object.values(spent).reduce(
    (a, b) => a + b,
    0
  );

  const totalBudget = Object.values(budget).reduce(
    (a, b) => a + b,
    0
  );

  // ----------------------------
  // CHART DATA
  // ----------------------------
  const pieData = categories.map((c) => ({
    name: c,
    value: spent[c],
  }));

  const COLORS = [
    "#1e3a8a",
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#1d4ed8",
  ];

  const comparisonData = [
    { name: "Budget", amount: totalBudget },
    { name: "Spent", amount: totalSpent },
  ];

  return (
    <div className="min-h-screen p-10 bg-stone-100 text-blue-950">
      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON (FIXED) */}
        <Link
          href="/"
          className="text-sm underline text-blue-900"
        >
          ← Back to dashboard
        </Link>

        <h1 className="text-3xl font-black mt-4">
          Budget Tracker
        </h1>

        <p className="text-blue-900 mt-1">
          Track spending, budgets, and financial balance visually.
        </p>

        {/* SUMMARY */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Total Spent</p>
            <p className="text-2xl font-bold">
              ${totalSpent.toFixed(2)}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Total Budget</p>
            <p className="text-2xl font-bold">
              ${totalBudget.toFixed(2)}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Remaining</p>
            <p className="text-2xl font-bold">
              ${(totalBudget - totalSpent).toFixed(2)}
            </p>
          </div>

        </div>

        {/* INPUT TABLE */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">
            Categories
          </h2>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div
                key={cat}
                className="grid md:grid-cols-3 gap-3 items-center border p-3 rounded"
              >
                <div className="font-semibold capitalize">
                  {cat}
                </div>

                <input
                  type="number"
                  className="border p-2 rounded"
                  placeholder="Spent"
                  value={spent[cat]}
                  onChange={(e) =>
                    updateSpent(cat, Number(e.target.value))
                  }
                />

                <input
                  type="number"
                  className="border p-2 rounded"
                  placeholder="Budget"
                  value={budget[cat]}
                  onChange={(e) =>
                    updateBudget(cat, Number(e.target.value))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* VISUAL DASHBOARD */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">
              Spending Breakdown
            </h2>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BAR CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">
              Budget vs Spending
            </h2>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="amount"
                    fill="#1e3a8a"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}