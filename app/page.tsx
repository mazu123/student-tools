import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-700 via-stone-200 to-white p-10">
      <h1 className="text-4xl font-black">Student Tools</h1>
      <p className="mt-2 text-slate-700">
        Free tools for students.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <Link href="/gpa" className="p-6 bg-white/70 rounded-xl shadow">
          GPA Calculator →
        </Link>

        <Link href="/planner" className="p-6 bg-white/70 rounded-xl shadow">
          Study Planner →
        </Link>

        <Link href="/budget" className="p-6 bg-white/70 rounded-xl shadow">
          Budget Tracker →
        </Link>

        <Link href="/resume" className="p-6 bg-white/70 rounded-xl shadow">
          Resume Builder →
        </Link>
      </div>
    </div>
  );
}