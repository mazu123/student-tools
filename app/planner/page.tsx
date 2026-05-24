"use client";

import { useState } from "react";
import Link from "next/link";

type Event = {
  day: number;
  text: string;
  type: "test" | "assignment" | "study";
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Planner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [text, setText] = useState("");
  const [type, setType] = useState<Event["type"]>("study");

  const addEvent = () => {
    if (!text) return;

    setEvents([
      ...events,
      {
        day: selectedDay,
        text,
        type,
      },
    ]);

    setText("");
  };

  const getColor = (type: Event["type"]) => {
    switch (type) {
      case "test":
        return "bg-red-500";
      case "assignment":
        return "bg-green-500";
      case "study":
        return "bg-yellow-400";
    }
  };

  return (
    <div className="min-h-screen p-10 bg-stone-100">
      <div className="max-w-6xl mx-auto">

        <Link href="/" className="text-sm underline">
          ← Back
        </Link>

        <h1 className="text-3xl font-black mt-4">
          Weekly Study Planner
        </h1>

        <p className="text-slate-600 mt-1">
          Click a day, add tasks, and organize your week visually.
        </p>

        {/* Input bar */}
        <div className="mt-6 flex flex-wrap gap-2 items-center">
          <input
            className="border p-2 rounded"
            placeholder="Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={type}
            onChange={(e) =>
              setType(e.target.value as Event["type"])
            }
          >
            <option value="test">Test</option>
            <option value="assignment">Assignment</option>
            <option value="study">Study</option>
          </select>

          <button
            onClick={addEvent}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Weekly grid */}
        <div className="grid grid-cols-7 gap-3 mt-8">
          {days.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`p-3 min-h-[140px] rounded-xl border bg-white cursor-pointer ${
                selectedDay === i ? "ring-2 ring-black" : ""
              }`}
            >
              <p className="font-bold text-sm mb-2">{d}</p>

              <div className="space-y-2">
                {events
                  .filter((e) => e.day === i)
                  .map((e, idx) => (
                    <div
                      key={idx}
                      className={`text-white text-xs p-1 rounded ${getColor(
                        e.type
                      )}`}
                    >
                      {e.text}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 text-sm text-slate-600">
          <p>
            <span className="text-red-500 font-bold">Red</span> = Test ·{" "}
            <span className="text-green-600 font-bold">Green</span> =
            Assignment ·{" "}
            <span className="text-yellow-500 font-bold">Yellow</span> =
            Study
          </p>
        </div>
      </div>
    </div>
  );
}