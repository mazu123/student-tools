"use client";

import { useState } from "react";
import Link from "next/link";

export default function GPA() {
  const [classes, setClasses] = useState([
    { type: "Regular", grade: "A" },
  ]);

  const gradePoints: Record<string, number> = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  const bonus: Record<string, number> = {
    Regular: 0,
    Honors: 0.5,
    AP: 1,
    IB: 1,
  };

  const gpa =
    classes.reduce(
      (sum, c) => sum + (gradePoints[c.grade] + bonus[c.type]),
      0
    ) / classes.length;

  return (
    <div className="min-h-screen p-10">
      <Link href="/">← Back</Link>

      <h1 className="text-3xl font-bold mt-4">GPA Calculator</h1>

      {classes.map((c, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mt-4">
          <select
            value={c.type}
            onChange={(e) => {
              const copy = [...classes];
              copy[i].type = e.target.value;
              setClasses(copy);
            }}
          >
            <option>Regular</option>
            <option>Honors</option>
            <option>AP</option>
            <option>IB</option>
          </select>

          <select
            value={c.grade}
            onChange={(e) => {
              const copy = [...classes];
              copy[i].grade = e.target.value;
              setClasses(copy);
            }}
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>F</option>
          </select>
        </div>
      ))}

      <button
        className="mt-6 px-4 py-2 bg-black text-white rounded"
        onClick={() =>
          setClasses([...classes, { type: "Regular", grade: "A" }])
        }
      >
        Add Class
      </button>

      <h2 className="mt-6 text-xl font-bold">
        GPA: {isNaN(gpa) ? "0.00" : gpa.toFixed(2)}
      </h2>
    </div>
  );
}