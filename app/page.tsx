export default function StudentToolsLanding() {
  const tools = [
    {
      title: 'GPA Calculator',
      description: 'Quickly calculate weighted and unweighted GPA with customizable class weights.',
    },
    {
      title: 'Study Planner',
      description: 'Organize assignments, exams, and study sessions in one clean dashboard.',
    },
    {
      title: 'Budget Tracker',
      description: 'Track spending, savings, and financial goals as a student.',
    },
    {
      title: 'Resume Builder',
      description: 'Create a clean student resume for internships, jobs, and scholarships.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-700 via-stone-200 to-white text-black">
      <nav className="flex items-center justify-between px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            StudentFlow
          </h1>
          <p className="text-sm text-slate-700">
            Free tools built for students.
          </p>
        </div>

        <div className="hidden gap-6 md:flex text-sm font-medium text-slate-800">
          <a href="#tools" className="hover:text-slate-950 transition">
            Tools
          </a>
          <a href="#about" className="hover:text-slate-950 transition">
            About
          </a>
          <a href="#future" className="hover:text-slate-950 transition">
            Future Features
          </a>
        </div>
      </nav>

      <main className="px-8 pb-20 pt-10">
        <section className="mx-auto max-w-6xl rounded-3xl border border-white/40 bg-white/40 p-10 shadow-2xl backdrop-blur-md">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-slate-300 bg-white/60 px-4 py-2 text-sm font-medium text-slate-800">
                100% Free Student Tools
              </div>

              <h2 className="max-w-xl text-5xl font-black leading-tight text-slate-950">
                Tools that actually help students stay ahead.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
                A modern collection of free tools designed for ambitious students.
                From GPA tracking to budgeting and productivity, StudentFlow helps
                students work smarter without paying for overpriced apps.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-slate-800">
                  Explore Tools
                </button>

                <button className="rounded-2xl border border-slate-700 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white">
                  Learn More
                </button>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-3xl border border-slate-300 bg-white/70 p-6 shadow-lg backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    Weekly Productivity
                  </h3>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm font-medium text-slate-700">
                      <span>Assignments Completed</span>
                      <span>78%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-200">
                      <div className="h-3 w-[78%] rounded-full bg-slate-900"></div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm font-medium text-slate-700">
                      <span>Study Goals</span>
                      <span>64%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-200">
                      <div className="h-3 w-[64%] rounded-full bg-blue-900"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-300 bg-slate-950 p-6 text-white shadow-lg">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                  Mission
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  Give students tools that should already exist for free.
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto mt-20 max-w-6xl">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-950">
              Featured Tools
            </h2>
            <p className="mt-3 text-lg text-slate-700">
              Clean, simple, and actually useful.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="group rounded-3xl border border-white/40 bg-white/50 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/70"
              >
                <div className="mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900"></div>

                <h3 className="text-xl font-bold text-slate-950">
                  {tool.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-700">
                  {tool.description}
                </p>

                <button className="mt-6 text-sm font-semibold text-blue-950 transition group-hover:translate-x-1">
                  Open Tool →
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="mx-auto mt-24 max-w-6xl rounded-3xl bg-slate-950 p-10 text-white shadow-2xl"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                About The Project
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight">
                Built by a student who understands student problems.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-slate-300">
                StudentFlow is designed to provide free, modern tools for students
                navigating academics, productivity, and financial planning. The
                goal is simple: make high-quality student resources accessible to
                everyone.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
