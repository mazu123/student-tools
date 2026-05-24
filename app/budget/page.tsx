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

type BudgetState = Record<string, number>;

export default function Budget() {
  const [spent, setSpent] = useState<BudgetState>({});
  const [budget, setBudget] = useState<BudgetState>({});

  const update = (
    setter: React.Dispatch<React.SetStateAction<BudgetState>>,
    key: string,
    value: string
  ) => {
    setter((prev) => ({
      ...prev,
      [key]: Number(value) || 0,
    }));
  };

  const totalSpent = Object.values(spent).reduce(
    (a, b) => a + b,
    0
  );

  const totalBudget = Object.values(budget).reduce(
    (a, b) => a + b,
    0
  );

  const totalDiff = totalBudget - totalSpent;

  const percentUsed = (s: number, b: number) => {
    if (!b) return 0;
    return Math.min((s / b) * 100, 100);
  };

  return (
    <div className="min-h-screen p-10 bg-stone-100">
      <div className="max-w-5xl mx-auto">

        <Link href="/" className="text-sm underline">
          ← Back
        </Link>

        <h1 className="text-3xl font-black mt-4">
          Budget Tracker
        </h1>

        <p className="text-slate-600 mt-1">
          Track spending vs budget across categories in real time.
        </p>

        {/* Summary cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card
            title="Total Budget"
            value={`$${totalBudget}`}
          />
          <Card
            title="Total Spent"
            value={`$${totalSpent}`}
          />
          <Card
            title="Remaining"
            value={`$${totalDiff}`}
            danger={totalDiff < 0}
          />
        </div>

        {/* Category breakdown */}
        <div className="mt-8 space-y-4">
          {categories.map((cat) => {
            const s = spent[cat] || 0;
            const b = budget[cat] || 0;

            return (
              <div
                key={cat}
                className="bg-white p-4 rounded-xl shadow"
              >
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{cat}</p>
                  <p className="text-sm text-slate-600">
                    ${s} / ${b}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded">
                  <div
                    className={`h-2 rounded ${
                      s > b ? "bg-red-500" : "bg-black"
                    }`}
                    style={{
                      width: `${percentUsed(s, b)}%`,
                    }}
                  />
                </div>

                {/* Inputs */}
                <div className="flex gap-2 mt-3">
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="Spent"
                    type="number"
                    onChange={(e) =>
                      update(setSpent, cat, e.target.value)
                    }
                  />

                  <input
                    className="border p-2 rounded w-full"
                    placeholder="Budget"
                    type="number"
                    onChange={(e) =>
                      update(setBudget, cat, e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- UI COMPONENT ---------- */

function Card({
  title,
  value,
  danger,
}: {
  title: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="p-5 bg-white rounded-xl shadow">
      <p className="text-sm text-slate-500">{title}</p>
      <p
        className={`text-2xl font-bold ${
          danger ? "text-red-500" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}