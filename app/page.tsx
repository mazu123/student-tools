import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-700 via-stone-200 to-white p-10 text-blue-950">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-5xl font-black tracking-tight text-blue-950">
          All In One College Prep
        </h1>

        <p className="mt-3 text-lg max-w-2xl text-blue-900">
          A simple, centralized dashboard built to help students track academics,
          manage finances, and stay organized without switching between apps.
        </p>

        {/* Mini dashboard preview */}
        <div className="mt-10 p-6 rounded-2xl bg-white/60 shadow text-blue-950">
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
        <div className="grid md:grid-cols-2 gap-6 mt-10 text-blue-950">
          <ToolCard title="GPA Calculator" href="/gpa" desc="Track weighted & unweighted GPA" />
          <ToolCard title="Study Planner" href="/planner" desc="Organize assignments & exams" />
          <ToolCard title="Budget Tracker" href="/budget" desc="Track spending vs budget" />
          <ToolCard title="Resume Builder" href="/resume" desc="Build a clean student resume" />
        </div>

        {/* Creator section */}
        <div className="mt-14 p-6 rounded-2xl bg-white/60 shadow text-blue-950">
          <h2 className="font-bold text-lg">Created by a Student</h2>
          <p className="mt-2 text-sm text-blue-900">
            “I built this because I know what it feels like to juggle school, deadlines,
            and planning for the future without the right tools. This is for students who
            want something simple, clean, and actually useful.”
          </p>
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
      <div className="p-6 rounded-2xl bg-white/70 shadow transition transform hover:-translate-y-1 hover:shadow-xl text-blue-950">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm mt-1 text-blue-900">{desc}</p>
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
      <div className="flex justify-between text-xs text-blue-900">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded">
        <div
          className="h-2 bg-blue-950 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}