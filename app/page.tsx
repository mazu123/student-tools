"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import GPA from "./gpa/page";
import Budget from "./budget/page";
import Planner from "./planner/page";
import Resume from "./resume/page";

type Tool = "none" | "gpa" | "budget" | "planner" | "resume";

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>("none");

  return (
    <div className="min-h-screen bg-stone-100 text-blue-950">

      {/* ================= HERO IMAGE ================= */}
      <div className="relative w-full h-[70vh] overflow-hidden">

        {/* background image */}
        <img
          src="https://plus.unsplash.com/premium_photo-1673240367277-e1d394465b56?fm=jpg&q=60&w=3000&auto=format&fit=crop"
          alt="background"
          className="w-full h-full object-cover"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* glass title panel */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 max-w-3xl text-center shadow-2xl">

            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight">
              Welcome to Academia OS
            </h1>

            <p className="text-white/80 mt-4 text-sm md:text-base">
              A unified system where every tool for a high school student’s success
              lives in one place — GPA, budgeting, planning, and more.
            </p>

          </div>
        </div>

      </div>

      {/* ================= FEATURE SECTION ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-2xl font-bold mb-8">
          Featured Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* GPA */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTool("gpa")}
            className="cursor-pointer bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold">GPA Tracker</h3>
            <p className="text-sm text-blue-900 mt-2">
              Track weighted & unweighted GPA with clarity.
            </p>
          </motion.div>

          {/* Budget */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTool("budget")}
            className="cursor-pointer bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold">Budget Tracker</h3>
            <p className="text-sm text-blue-900 mt-2">
              Understand spending habits and control finances.
            </p>
          </motion.div>

          {/* Planner */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTool("planner")}
            className="cursor-pointer bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold">Study Planner</h3>
            <p className="text-sm text-blue-900 mt-2">
              Organize tasks and stay ahead of deadlines.
            </p>
          </motion.div>

          {/* Resume */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTool("resume")}
            className="cursor-pointer bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold">Resume Builder</h3>
            <p className="text-sm text-blue-900 mt-2">
              Build a clean, professional resume instantly.
            </p>
          </motion.div>

        </div>
      </div>

      {/* ================= TOOL MODAL VIEW ================= */}
      {activeTool !== "none" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto p-6">

            <button
              onClick={() => setActiveTool("none")}
              className="text-sm text-blue-900 underline mb-4"
            >
              ← Back
            </button>

            {activeTool === "gpa" && <GPA />}
            {activeTool === "budget" && <Budget />}
            {activeTool === "planner" && <Planner />}
            {activeTool === "resume" && <Resume />}

          </div>

        </div>
      )}

    </div>
  );
}