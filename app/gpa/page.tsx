"use client";

import { useState } from "react";
import Link from "next/link";

type ClassItem = {
  name: string;
  type: "Regular" | "Honors" | "AP" | "IB";
  grade: "A" | "B" | "C" | "D" | "F";
};

export default function GPA() {
  const [classes, setClasses] = useState<ClassItem[]>([
    { name: "Class 1", type: "Regular", grade: "A" },
  ]);

  const gradePoints: Record<ClassItem["grade"], number> = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  const bonusPoints: Record<ClassItem["type"], number> = {
    Regular: 0,
    Honors: 0.5,
    AP: 1,
    IB: 1,
  };

  const updateClass = (
    index: number,
    field: keyof ClassItem,
    value: string
  ) => {
    const copy = [...classes];
    (copy[index] as any)[field] = value;
    setClasses(copy);
  };

  const addClass = () => {
    setClasses([
      ...classes,
      {
        name: `Class ${classes.length + 1}`,
        type: "Regular",
        grade: "A",
      },
    ]);
  };

  const removeClass = (index: number) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  // Weighted GPA
  const weightedGPA =
    classes.reduce((sum, c) => {
      return sum + gradePoints[c.grade] + bonusPoints[c.type];
    }, 0) / classes.length;

  // Unweighted GPA (no bonus)
  const unweightedGPA =
    classes.reduce((sum, c) => {
      return sum + gradePoints[c.grade];
    }, 0) / classes.length;

  return (
    <div className="min-h-screen p-10 bg-stone-100 text-blue-950">
      <div className="max-w-4xl mx-auto">

        <Link href="/" className="text-sm underline text-blue-900">
          ← Back to dashboard
        </Link>

        <h1 className="text-3xl font-black mt-4 text-blue-950">
          GPA Calculator
        </h1>

        <p className="text-blue-900 mt-1">
          Track both weighted and unweighted GPA in real time.
        </p>

        {/* GPA DISPLAY */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">

          <div className="p-5 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Weighted GPA</p>
            <p className="text-4xl font-bold">
              {isNaN(weightedGPA) ? "0.00" : weightedGPA.toFixed(2)}
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Unweighted GPA</p>
            <p className="text-4xl font-bold">
              {isNaN(unweightedGPA) ? "0.00" : unweightedGPA.toFixed(2)}
            </p>
          </div>

        </div>

        {/* CLASS INPUTS */}
        <div className="mt-6 space-y-4">
          {classes.map((c, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl shadow grid md:grid-cols-4 gap-3 items-center"
            >
              <input
                className="border p-2 rounded text-blue-950"
                value={c.name}
                onChange={(e) =>
                  updateClass(i, "name", e.target.value)
                }
                placeholder="Class name"
              />

              <select
                className="border p-2 rounded text-blue-950"
                value={c.type}
                onChange={(e) =>
                  updateClass(i, "type", e.target.value)
                }
              >
                <option>Regular</option>
                <option>Honors</option>
                <option>AP</option>
                <option>IB</option>
              </select>

              <select
                className="border p-2 rounded text-blue-950"
                value={c.grade}
                onChange={(e) =>
                  updateClass(i, "grade", e.target.value)
                }
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>F</option>
              </select>

              <button
                onClick={() => removeClass(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addClass}
          className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
          Add Class
        </button>

        {/* QUOTE */}
        <div className="mt-10 p-6 bg-white rounded-xl shadow text-center">
          <p className="italic text-blue-900">
            "your gpa doesn't define you as a person!"
          </p>
          <p className="text-sm text-blue-900 mt-2">
            - former student
          </p>
        </div>

      </div>
    </div>
  );
}