"use client";

import { useState } from "react";

export default function StudentToolsApp() {
  const [page, setPage] = useState("home");

  // ---------------- GPA ----------------
  const [classes, setClasses] = useState([
    { name: "", type: "Regular", grade: "A" },
  ]);

  const gradePoints: Record<string, number> = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  const typeBonus: Record<string, number> = {
    Regular: 0,
    Honors: 0.5,
    AP: 1,
    IB: 1,
  };

  const calculateGPA = () => {
    if (!classes.length) return "0.00";
    let total = 0;
    classes.forEach((c) => {
      total += (gradePoints[c.grade] ?? 0) + (typeBonus[c.type] ?? 0);
    });
    return (total / classes.length).toFixed(2);
  };

  // ---------------- STUDY PLANNER ----------------
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState("");
  const [eventDay, setEventDay] = useState(1);
  const [eventType, setEventType] = useState("test");

  const addEvent = () => {
    setEvents([
      ...events,
      { day: Number(eventDay), text: eventText, type: eventType },
    ]);
  };

  const getColor = (type) => {
    if (type === "test") return "bg-red-500";
    if (type === "assignment") return "bg-green-500";
    return "bg-yellow-400";
  };

  // ---------------- BUDGET ----------------
  const categories = ["Clothes", "Entertainment", "Food", "Gifts", "Personal", "School"];
  const [spent, setSpent] = useState({});
  const [budget, setBudget] = useState({});

  const updateSpent = (cat, value) => {
    setSpent({ ...spent, [cat]: Number(value) });
  };

  const updateBudget = (cat, value) => {
    setBudget({ ...budget, [cat]: Number(value) });
  };

  const totalSpent = Object.values(spent).reduce((a, b) => a + (b || 0), 0);
  const totalBudget = Object.values(budget).reduce((a, b) => a + (b || 0), 0);

  // ---------------- RESUME ----------------
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    gpa: "",
    act: "",
    sat: "",
    awards: "",
    orgs: [{ org: "", role: "" }],
  });

  const addOrg = () => {
    setResume({
      ...resume,
      orgs: [...resume.orgs, { org: "", role: "" }],
    });
  };

  // ---------------- GPA PAGE ----------------
  if (page === "gpa") {
    return (
      <div className="min-h-screen p-8 bg-stone-100">
        <button onClick={() => setPage("home")}>← Back</button>
        <h1 className="text-2xl font-bold">GPA Calculator</h1>

        {classes.map((c, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mt-2">
            <input placeholder="Class" onChange={(e) => {
              const copy = [...classes]; copy[i].name = e.target.value; setClasses(copy);
            }} />

            <select onChange={(e) => {
              const copy = [...classes]; copy[i].type = e.target.value; setClasses(copy);
            }}>
              <option>Regular</option>
              <option>Honors</option>
              <option>AP</option>
              <option>IB</option>
            </select>

            <select onChange={(e) => {
              const copy = [...classes]; copy[i].grade = e.target.value; setClasses(copy);
            }}>
              <option>A</option><option>B</option><option>C</option><option>D</option><option>F</option>
            </select>
          </div>
        ))}

        <button onClick={() => setClasses([...classes, { name: "", type: "Regular", grade: "A" }])}>
          Add Class
        </button>

        <h2>GPA: {calculateGPA()}</h2>
      </div>
    );
  }

  // ---------------- PLANNER PAGE ----------------
  if (page === "planner") {
    return (
      <div className="min-h-screen p-8 bg-white">
        <button onClick={() => setPage("home")}>← Back</button>
        <h1 className="text-2xl font-bold">Study Planner</h1>

        <div className="grid grid-cols-7 gap-2 mt-4">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="border p-2 h-20">
              <div className="text-xs">Day {i + 1}</div>
              {events
                .filter((e) => e.day === i + 1)
                .map((e, idx) => (
                  <div key={idx} className={`text-xs text-white p-1 mt-1 ${getColor(e.type)}`}> 
                    {e.text}
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <input placeholder="Task" onChange={(e) => setEventText(e.target.value)} />
          <input type="number" min="1" max="30" onChange={(e) => setEventDay(e.target.value)} />
          <select onChange={(e) => setEventType(e.target.value)}>
            <option value="test">Test</option>
            <option value="assignment">Assignment</option>
            <option value="study">Study</option>
          </select>
          <button onClick={addEvent}>Add</button>
        </div>

        <div className="fixed bottom-2 left-2 text-xs">
          <div className="bg-red-500 text-white p-1">Test</div>
          <div className="bg-green-500 text-white p-1">Assignment</div>
          <div className="bg-yellow-400 text-black p-1">Study</div>
        </div>
      </div>
    );
  }

  // ---------------- BUDGET PAGE ----------------
  if (page === "budget") {
    return (
      <div className="min-h-screen p-8">
        <button onClick={() => setPage("home")}>← Back</button>
        <h1 className="text-2xl font-bold">Budget Tracker</h1>

        <table className="mt-4 w-full border">
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
                  <input type="number" onChange={(e) => updateSpent(cat, e.target.value)} />
                </td>
                <td>
                  <input type="number" onChange={(e) => updateBudget(cat, e.target.value)} />
                </td>
                <td>{(budget[cat] || 0) - (spent[cat] || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total Spent: {totalSpent}</h3>
        <h3>Total Budget: {totalBudget}</h3>
        <h3>Difference: {totalBudget - totalSpent}</h3>
      </div>
    );
  }

  // ---------------- RESUME PAGE ----------------
  if (page === "resume") {
    return (
      <div className="min-h-screen p-8">
        <button onClick={() => setPage("home")}>← Back</button>
        <h1 className="text-2xl font-bold">Resume Builder</h1>

        <input placeholder="Name" onChange={(e) => setResume({ ...resume, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setResume({ ...resume, email: e.target.value })} />
        <input placeholder="Phone" onChange={(e) => setResume({ ...resume, phone: e.target.value })} />
        <input placeholder="GPA" onChange={(e) => setResume({ ...resume, gpa: e.target.value })} />
        <input placeholder="ACT" onChange={(e) => setResume({ ...resume, act: e.target.value })} />
        <input placeholder="SAT" onChange={(e) => setResume({ ...resume, sat: e.target.value })} />
        <input placeholder="Awards" onChange={(e) => setResume({ ...resume, awards: e.target.value })} />

        {resume.orgs.map((o, i) => (
          <div key={i}>
            <input placeholder="Organization" onChange={(e) => {
              const copy = [...resume.orgs]; copy[i].org = e.target.value; setResume({ ...resume, orgs: copy });
            }} />
            <input placeholder="Role" onChange={(e) => {
              const copy = [...resume.orgs]; copy[i].role = e.target.value; setResume({ ...resume, orgs: copy });
            }} />
          </div>
        ))}

        <button onClick={addOrg}>Add Organization</button>

        <h3 className="mt-4">Copy and paste onto your resume document.</h3>
      </div>
    );
  }

  // ---------------- HOME PAGE ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-700 via-stone-200 to-white p-8">
      <h1 className="text-4xl font-black">Student Tools</h1>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <button onClick={() => setPage("gpa")} className="p-6 bg-white shadow">
          GPA Calculator
        </button>
        <button onClick={() => setPage("planner")} className="p-6 bg-white shadow">
          Study Planner
        </button>
        <button onClick={() => setPage("budget")} className="p-6 bg-white shadow">
          Budget Tracker
        </button>
        <button onClick={() => setPage("resume")} className="p-6 bg-white shadow">
          Resume Builder
        </button>
      </div>
    </div>
  );
}
