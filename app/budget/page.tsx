"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Category = {
  name: string;
  budget: number;
  spent: number;
};

type AidItem = {
  cost: number;
  paid: number;
};

const COLORS = [
  "#1d4ed8",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
];

export default function BudgetTracker() {
  const [categories, setCategories] = useState<Category[]>([
    {
      name: "Food",
      budget: 200,
      spent: 50,
    },
  ]);

  const [aidCosts, setAidCosts] = useState<Record<string, AidItem>>({
    Tuition: { cost: 0, paid: 0 },
    "Mandatory fees": { cost: 0, paid: 0 },
    "On-campus dorm housing": { cost: 0, paid: 0 },
    "On-campus meal plans": { cost: 0, paid: 0 },
    Textbooks: { cost: 0, paid: 0 },
    "Lab supplies": { cost: 0, paid: 0 },
    "Computer hardware": { cost: 0, paid: 0 },
    "Software subscriptions": { cost: 0, paid: 0 },
    "Gas and fuel": { cost: 0, paid: 0 },
    "Public transit passes": { cost: 0, paid: 0 },
    "Parking permits": { cost: 0, paid: 0 },
    "Flights home for breaks": { cost: 0, paid: 0 },
    "Off-campus apartment rent": { cost: 0, paid: 0 },
    "Off-campus groceries": { cost: 0, paid: 0 },
    Utilities: { cost: 0, paid: 0 },
    "Cell phone plans": { cost: 0, paid: 0 },
    "Health insurance": { cost: 0, paid: 0 },
    "Medical co-pays": { cost: 0, paid: 0 },
    Toiletries: { cost: 0, paid: 0 },
    "Laundry supplies": { cost: 0, paid: 0 },
    Clothing: { cost: 0, paid: 0 },
    Entertainment: { cost: 0, paid: 0 },
  });

  const reportRef = useRef<HTMLDivElement>(null);
  const aidRef = useRef<HTMLDivElement>(null);

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    const savedBudget = localStorage.getItem("budget_tracker");
    const savedAid = localStorage.getItem("financial_aid");

    if (savedBudget) setCategories(JSON.parse(savedBudget));
    if (savedAid) setAidCosts(JSON.parse(savedAid));
  }, []);

  /* ---------------- SAVE ---------------- */
  useEffect(() => {
    localStorage.setItem("budget_tracker", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("financial_aid", JSON.stringify(aidCosts));
  }, [aidCosts]);

  /* ---------------- BUDGET ---------------- */
  const updateCategory = (i: number, field: keyof Category, value: string) => {
    const copy = [...categories];
    if (field === "name") copy[i][field] = value as never;
    else copy[i][field] = Number(value) as never;
    setCategories(copy);
  };

  const addCategory = () =>
    setCategories([
      ...categories,
      { name: `Category ${categories.length + 1}`, budget: 0, spent: 0 },
    ]);

  const removeCategory = (i: number) =>
    setCategories(categories.filter((_, idx) => idx !== i));

  const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);

  const pieData = categories.map((c) => ({
    name: c.name,
    value: c.spent,
  }));

  const barData = [
    {
      name: "Overview",
      Budget: totalBudget,
      Spent: totalSpent,
    },
  ];

  /* ---------------- FINANCIAL AID ---------------- */
  const updateAid = (key: string, field: "cost" | "paid", value: string) => {
    setAidCosts((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: Number(value) },
    }));
  };

  const totalAidCost = Object.values(aidCosts).reduce((s, v) => s + v.cost, 0);
  const totalPaid = Object.values(aidCosts).reduce((s, v) => s + v.paid, 0);

  const aidPieData = Object.entries(aidCosts).map(([key, val]) => ({
    name: key,
    value: val.cost,
  }));

  const aidBarData = Object.entries(aidCosts).map(([key, val]) => ({
    name: key,
    Cost: val.cost,
    Paid: val.paid,
  }));

  /* ---------------- EXPORTS ---------------- */
  const exportPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      backgroundColor: "#fff",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("budget-report.pdf");
  };

  const exportAidPDF = async () => {
    if (!aidRef.current) return;

    const canvas = await html2canvas(aidRef.current, {
      backgroundColor: "#fff",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("financial-aid-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 text-blue-950">

      <div className="max-w-6xl mx-auto">

        <Link href="/" className="text-sm underline">
          ← Back
        </Link>

        <h1 className="text-3xl font-black mt-4">
          Budget Tracker
        </h1>

        {/* SUMMARY */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Total Budget</p>
            <h2 className="text-4xl font-bold mt-2">
              ${totalBudget.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Total Spent</p>
            <h2 className="text-4xl font-bold mt-2">
              ${totalSpent.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* CATEGORY INPUTS */}
        <div className="space-y-4 mt-8">
          {categories.map((c, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow grid md:grid-cols-4 gap-4"
            >
              <input
                className="border p-2 rounded"
                value={c.name}
                onChange={(e) =>
                  updateCategory(i, "name", e.target.value)
                }
              />

              <input
                type="number"
                className="border p-2 rounded"
                value={c.budget}
                onChange={(e) =>
                  updateCategory(i, "budget", e.target.value)
                }
              />

              <input
                type="number"
                className="border p-2 rounded"
                value={c.spent}
                onChange={(e) =>
                  updateCategory(i, "spent", e.target.value)
                }
              />

              <button
                onClick={() => removeCategory(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addCategory}
          className="mt-6 px-4 py-2 bg-black text-white rounded-xl"
        >
          Add Category
        </button>

        {/* REPORT */}
        <div ref={reportRef} className="mt-12 bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6">Budget Report</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={100}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Budget" fill="#1d4ed8" />
                  <Bar dataKey="Spent" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <button
          onClick={exportPDF}
          className="mt-8 px-5 py-3 bg-blue-950 text-white rounded-2xl"
        >
          Export Report
        </button>

        {/* FINANCIAL AID */}
        <div ref={aidRef} className="mt-16 bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Financial Aid
          </h2>

          <div className="grid grid-cols-3 gap-4 border-b pb-3 mb-4 font-semibold text-blue-900">
            <div>Category</div>
            <div className="text-center">Cost</div>
            <div className="text-center">Paid</div>
          </div>

          <div className="space-y-3">
            {Object.keys(aidCosts).map((key) => (
              <div
                key={key}
                className="grid grid-cols-3 gap-4 items-center"
              >
                <div className="text-sm font-medium">
                  {key}
                </div>

                <input
                  type="number"
                  className="border p-2 rounded text-right"
                  value={aidCosts[key].cost}
                  onChange={(e) =>
                    updateAid(key, "cost", e.target.value)
                  }
                />

                <input
                  type="number"
                  className="border p-2 rounded text-right"
                  value={aidCosts[key].paid}
                  onChange={(e) =>
                    updateAid(key, "paid", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* TOTALS */}
          <div className="mt-8 border-t pt-4 space-y-2">
            <div className="flex justify-between font-bold">
              <span>Total Cost</span>
              <span>${totalAidCost.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-blue-800">
              <span>Total Paid</span>
              <span>${totalPaid.toFixed(2)}</span>
            </div>
          </div>

          {/* EXPORT BUTTON */}
          <button
            onClick={exportAidPDF}
            className="mt-6 px-5 py-3 bg-blue-900 text-white rounded-2xl"
          >
            Export Financial Aid
          </button>

          {/* CHARTS */}
          <div className="mt-10 grid md:grid-cols-2 gap-8">

            <div className="h-72">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Cost Distribution
              </h3>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aidPieData}
                    dataKey="value"
                    outerRadius={100}
                  >
                    {aidPieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-72">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Cost vs Paid Gap
              </h3>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aidBarData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Cost" fill="#1d4ed8" />
                  <Bar dataKey="Paid" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}