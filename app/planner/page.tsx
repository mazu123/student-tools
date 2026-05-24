"use client";

import { useState } from "react";
import Link from "next/link";

export default function Planner() {
  const [events, setEvents] = useState<
    { day: number; text: string; type: string }[]
  >([]);

  const [text, setText] = useState("");
  const [day, setDay] = useState(1);
  const [type, setType] = useState("test");

  const addEvent = () => {
    if (!text) return;

    setEvents([
      ...events,
      { day: Number(day), text, type },
    ]);
  };

  const color = (t: string) => {
    if (t === "test") return "bg-red-500";
    if (t === "assignment") return "bg-green-500";
    return "bg-yellow-400";
  };

  return (
    <div className="min-h-screen p-10">
      <Link href="/">← Back</Link>

      <h1 className="text-3xl font-bold mt-4">Study Planner</h1>

      <div className="grid grid-cols-7 gap-2 mt-6">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="border h-24 p-1">
            <p className="text-xs">Day {i + 1}</p>

            {events
              .filter((e) => e.day === i + 1)
              .map((e, idx) => (
                <div
                  key={idx}
                  className={`text-white text-xs p-1 mt-1 ${color(
                    e.type
                  )}`}
                >
                  {e.text}
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          placeholder="Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          min="1"
          max="30"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        />

        <select onChange={(e) => setType(e.target.value)}>
          <option value="test">Test</option>
          <option value="assignment">Assignment</option>
          <option value="study">Study</option>
        </select>

        <button onClick={addEvent}>Add</button>
      </div>
    </div>
  );
}