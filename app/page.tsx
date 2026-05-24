import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-700 via-stone-200 to-white p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-5xl font-black tracking-tight">
          Student Tools
        </h1>

        <p className="mt-3 text-slate-700 text-lg max-w-2xl">
          A simple, centralized dashboard built to help students track academics,
          manage finances, and stay organized without switching between apps.
        </p>

        {/* Mini dashboard preview */}
        <div className="mt-10 p-6 rounded-2xl bg-white/60 shadow">
          <h2 className="font-bold text-lg mb-4">Quick Overview</h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* GPA preview */}
            <div>
              <p className="text-sm font-medium mb-2">Example GPA Trend</p>
              <Bar label="Freshman" value={70} />
              <Bar label="Sophomore" value={78} />
              <Bar label="Junior" value={85} />
              <Bar label="Senior" value={92} />
            </div>

            {/* Budget preview */}
            <div>
              <p className="text-sm font-medium mb-2">Example Budget Usage</p>
              <Bar label="Food" value={60} />
              <Bar label="Entertainment" value={40} />
              <Bar label="Clothes" value={75} />
              <Bar label="School" value={30} />
            </div>

          </div>
        </div>

        {/* Tool cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <ToolCard
            title="GPA Calculator"
            href="/gpa"
            desc="Track weighted & unweighted GPA"
          />
          <ToolCard
            title="Study Planner"
            href="/planner"
            desc="Organize assignments & exams"
          />
          <ToolCard
            title="Budget Tracker"
            href="/budget"
            desc="Track spending vs budget"
          />
          <ToolCard
            title="Resume Builder"
            href="/resume"
            desc="Build a clean student resume"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function ToolCard({
  title,
  href,
  desc,
}: {
  title: string;
  href: string;
  desc: string;
}) {
  return (
    <Link href={href}>
      <div className="p-6 rounded-2xl bg-white/70 shadow transition transform hover:-translate-y-1 hover:shadow-xl">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-slate-600 mt-1">{desc}</p>
        <p className="text-sm mt-4 font-medium">Open →</p>
      </div>
    </Link>
  );
}

function Bar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded">
        <div
          className="h-2 bg-slate-800 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}