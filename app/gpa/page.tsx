"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Quarter = "Q1" | "Q2" | "Q3" | "Q4";
type Grade = "A" | "B" | "C" | "D" | "F";

type ClassItem = {
  name: string;
  type: "Regular" | "Honors" | "AP" | "IB";
  quarterGrades: Record<Quarter, Grade>;
};

const DEFAULT_CLASS: ClassItem = {
  name: "Class 1",
  type: "Regular",
  quarterGrades: {
    Q1: "A",
    Q2: "A",
    Q3: "A",
    Q4: "A",
  },
};

export default function GPA() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  // ----------------------------
  // PREDICTION STATE
  // ----------------------------
  const [predictionQuarter, setPredictionQuarter] =
    useState<Quarter>("Q1");

  const [predictionGrades, setPredictionGrades] = useState<
    Record<number, Grade>
  >({});

  // ----------------------------
  // SAFE LOAD + MIGRATION
  // ----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("gpa");

    if (!saved) {
      setClasses([DEFAULT_CLASS]);
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      const migrated = parsed.map((c: any) => ({
        name: c?.name ?? "Class",
        type: c?.type ?? "Regular",
        quarterGrades: {
          Q1: c?.quarterGrades?.Q1 ?? "A",
          Q2: c?.quarterGrades?.Q2 ?? "A",
          Q3: c?.quarterGrades?.Q3 ?? "A",
          Q4: c?.quarterGrades?.Q4 ?? "A",
        },
      }));

      setClasses(migrated);
    } catch {
      setClasses([DEFAULT_CLASS]);
    }
  }, []);

  // ----------------------------
  // AUTO SAVE
  // ----------------------------
  useEffect(() => {
    if (classes.length > 0) {
      localStorage.setItem("gpa", JSON.stringify(classes));
    }
  }, [classes]);

  const gradePoints: Record<Grade, number> = {
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

  // ----------------------------
  // SAFE HELPERS
  // ----------------------------
  const safeGrade = (g?: Grade): Grade => g ?? "A";

  const getQuarterGPA = (q: Quarter) => {
    let total = 0;
    let count = 0;

    classes.forEach((c) => {
      total +=
        gradePoints[safeGrade(c.quarterGrades?.[q])] +
        bonusPoints[c.type];
      count++;
    });

    return count === 0 ? 0 : total / count;
  };

  const getOverallGPA = () => {
    let total = 0;
    let count = 0;

    (["Q1", "Q2", "Q3", "Q4"] as Quarter[]).forEach((q) => {
      classes.forEach((c) => {
        total +=
          gradePoints[safeGrade(c.quarterGrades?.[q])] +
          bonusPoints[c.type];
        count++;
      });
    });

    return count === 0 ? 0 : total / count;
  };

  const weightedGPA = getOverallGPA();

  const unweightedGPA = (() => {
    let total = 0;
    let count = 0;

    (["Q1", "Q2", "Q3", "Q4"] as Quarter[]).forEach((q) => {
      classes.forEach((c) => {
        total += gradePoints[safeGrade(c.quarterGrades?.[q])];
        count++;
      });
    });

    return count === 0 ? 0 : total / count;
  })();

  const semester1 =
    (getQuarterGPA("Q1") + getQuarterGPA("Q2")) / 2;

  const semester2 =
    (getQuarterGPA("Q3") + getQuarterGPA("Q4")) / 2;

  // ----------------------------
  // TREND DATA
  // ----------------------------
  const trendData = [
    { quarter: "Q1", gpa: getQuarterGPA("Q1") },
    { quarter: "Q2", gpa: getQuarterGPA("Q2") },
    { quarter: "Q3", gpa: getQuarterGPA("Q3") },
    { quarter: "Q4", gpa: getQuarterGPA("Q4") },
  ];

  // ----------------------------
  // PREDICTED GPA
  // ----------------------------
  const getPredictedGPA = () => {
    let total = 0;
    let count = 0;

    classes.forEach((c, i) => {
      (["Q1", "Q2", "Q3", "Q4"] as Quarter[]).forEach((q) => {
        const grade =
          q === predictionQuarter
            ? predictionGrades[i] ?? c.quarterGrades[q]
            : c.quarterGrades[q];

        total += gradePoints[grade] + bonusPoints[c.type];
        count++;
      });
    });

    return count === 0 ? 0 : total / count;
  };

  // ----------------------------
  // UPDATE FUNCTIONS
  // ----------------------------
  const updateClass = (i: number, field: keyof ClassItem, value: any) => {
    const copy = [...classes];
    (copy[i] as any)[field] = value;
    setClasses(copy);
  };

  const updateQuarterGrade = (
    i: number,
    q: Quarter,
    value: Grade
  ) => {
    const copy = [...classes];
    copy[i].quarterGrades[q] = value;
    setClasses(copy);
  };

  const addClass = () => {
    setClasses([
      ...classes,
      {
        name: `Class ${classes.length + 1}`,
        type: "Regular",
        quarterGrades: {
          Q1: "A",
          Q2: "A",
          Q3: "A",
          Q4: "A",
        },
      },
    ]);
  };

  const removeClass = (i: number) => {
    setClasses(classes.filter((_, index) => index !== i));
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="min-h-screen p-10 bg-stone-100 text-blue-950">
      <div className="max-w-6xl mx-auto">

        <Link href="/" className="text-sm underline text-blue-900">
          ← Back to dashboard
        </Link>

        <h1 className="text-3xl font-black mt-4">
          GPA Calculator
        </h1>

        <p className="text-blue-900 mt-1">
          Full academic tracker with predictive GPA simulation.
        </p>

        {/* SUMMARY */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Weighted</p>
            <p className="text-2xl font-bold">{weightedGPA.toFixed(2)}</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Unweighted</p>
            <p className="text-2xl font-bold">{unweightedGPA.toFixed(2)}</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Semester 1</p>
            <p className="text-2xl font-bold">{semester1.toFixed(2)}</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-sm text-blue-900">Semester 2</p>
            <p className="text-2xl font-bold">{semester2.toFixed(2)}</p>
          </div>

        </div>

        {/* PREDICTION TOOL */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">
            Predictive GPA Simulator
          </h2>

          <div className="flex gap-4 items-center mb-4">
            <span className="text-sm font-semibold">
              Quarter:
            </span>

            <select
              className="border p-2 rounded"
              value={predictionQuarter}
              onChange={(e) =>
                setPredictionQuarter(e.target.value as Quarter)
              }
            >
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>
          </div>

          <div className="space-y-2">
            {classes.map((c, i) => (
              <div
                key={i}
                className="flex justify-between border p-2 rounded"
              >
                <span>{c.name}</span>

                <select
                  className="border p-1 rounded"
                  value={
                    predictionGrades[i] ??
                    c.quarterGrades[predictionQuarter]
                  }
                  onChange={(e) =>
                    setPredictionGrades((prev) => ({
                      ...prev,
                      [i]: e.target.value as Grade,
                    }))
                  }
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>F</option>
                </select>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-stone-100 rounded">
            <p className="text-sm text-blue-900">Predicted GPA</p>
            <p className="text-2xl font-bold">
              {getPredictedGPA().toFixed(2)}
            </p>
            <p className="text-sm text-blue-900">
              Change: {(getPredictedGPA() - weightedGPA).toFixed(2)}
            </p>
          </div>
        </div>

        {/* CHART */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">GPA Trend</h2>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#1e3a8a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INPUTS */}
        <div className="mt-10 space-y-4">
          {classes.map((c, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl shadow grid md:grid-cols-7 gap-2"
            >
              <input
                className="border p-2 rounded"
                value={c.name}
                onChange={(e) =>
                  updateClass(i, "name", e.target.value)
                }
              />

              <select
                className="border p-2 rounded"
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

              {(["Q1", "Q2", "Q3", "Q4"] as Quarter[]).map((q) => (
                <div key={q} className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-blue-900">
                    {q}
                  </span>

                  <select
                    className="border p-2 rounded"
                    value={c.quarterGrades?.[q] ?? "A"}
                    onChange={(e) =>
                      updateQuarterGrade(i, q, e.target.value as Grade)
                    }
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

      </div>
    </div>
  );
}