"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Event = {
  id: string;
  day: number;
  text: string;
  type: "test" | "assignment" | "study";
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Planner() {
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("planner");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  const [selectedDay, setSelectedDay] = useState(0);
  const [text, setText] = useState("");
  const [type, setType] = useState<Event["type"]>("study");

  const addEvent = () => {
    if (!text) return;

    const newEvent: Event = {
      id: crypto.randomUUID(),
      day: selectedDay,
      text,
      type,
    };

    setEvents([...events, newEvent]);
    setText("");
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
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

  // AUTO SAVE
  useEffect(() => {
    localStorage.setItem("planner", JSON.stringify(events));
  }, [events]);

  return (
    <div className="min-h-screen p-10 bg-stone-100 text-blue-950">
      <div className="max-w-6xl mx-auto">

        <Link href="/" className="text-sm underline text-blue-900">
          ← Back
        </Link>

        <h1 className="text-3xl font-black mt-4">
          Weekly Study Planner
        </h1>

        <p className="text-blue-900 mt-1">
          Organize your week with color-coded tasks and auto-saving storage.
        </p>

        {/* INPUT BAR */}
        <div className="mt-6 flex flex-wrap gap-2 items-center">
          <input
            className="border p-2 rounded text-blue-950"
            placeholder="Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <select
            className="border p-2 rounded text-blue-950"
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

        {/* WEEK GRID */}
        <div className="grid grid-cols-7 gap-3 mt-8">
          {days.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`p-3 min-h-[140px] rounded-xl border bg-white cursor-pointer ${
                selectedDay === i ? "ring-2 ring-black" : ""
              }`}
            >
              <p className="font-bold text-sm mb-2 text-blue-950">
                {d}
              </p>

              <div className="space-y-2">
                {events
                  .filter((e) => e.day === i)
                  .map((e) => (
                    <div
                      key={e.id}
                      className={`text-white text-xs p-1 rounded flex justify-between items-center ${getColor(
                        e.type
                      )}`}
                    >
                      <span className="pr-2">{e.text}</span>

                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          deleteEvent(e.id);
                        }}
                        className="text-white text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* TASK LIST */}
        <div className="mt-10 bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-blue-950 mb-3">
            All Tasks
          </h2>

          {events.length === 0 ? (
            <p className="text-blue-900 text-sm">
              No tasks added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {events.map((e) => (
                <div
                  key={e.id}
                  className="flex justify-between items-center border-b pb-2 text-blue-950"
                >
                  <div>
                    <p className="text-sm font-medium">{e.text}</p>
                    <p className="text-xs text-blue-900">
                      {days[e.day]} • {e.type}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteEvent(e.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LEGEND */}
        <div className="mt-6 text-sm text-blue-900">
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