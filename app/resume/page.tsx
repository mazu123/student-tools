"use client";

import { useState } from "react";
import Link from "next/link";

type Org = {
  org: string;
  role: string;
};

export default function Resume() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gpa, setGpa] = useState("");
  const [sat, setSat] = useState("");
  const [act, setAct] = useState("");
  const [awards, setAwards] = useState("");

  const [orgs, setOrgs] = useState<Org[]>([
    { org: "", role: "" },
  ]);

  const updateOrg = (index: number, field: keyof Org, value: string) => {
    const copy = [...orgs];
    copy[index][field] = value;
    setOrgs(copy);
  };

  const addOrg = () => {
    setOrgs([...orgs, { org: "", role: "" }]);
  };

  const resumeText = `
Name: ${name}
Email: ${email}
Phone: ${phone}

GPA: ${gpa}
SAT: ${sat}
ACT: ${act}

Awards: ${awards}

Organizations:
${orgs.map((o) => `- ${o.org} (${o.role})`).join("\n")}
  `;

  return (
    <div className="min-h-screen p-10 bg-stone-100 text-blue-950">
      <div className="max-w-4xl mx-auto">

        <Link href="/" className="text-sm underline text-blue-900">
          ← Back
        </Link>

        <h1 className="text-3xl font-black mt-4 text-blue-950">
          Resume Builder
        </h1>

        <p className="text-blue-900 mt-1">
          Fill in your information and generate a clean resume format.
        </p>

        {/* PERSONAL INFO */}
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <input
            className="border p-2 rounded w-full text-blue-950"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full text-blue-950"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full text-blue-950"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full text-blue-950"
            placeholder="GPA"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full text-blue-950"
            placeholder="SAT Score"
            value={sat}
            onChange={(e) => setSat(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full text-blue-950"
            placeholder="ACT Score"
            value={act}
            onChange={(e) => setAct(e.target.value)}
          />
        </div>

        {/* AWARDS */}
        <textarea
          className="w-full mt-3 p-2 border rounded text-blue-950"
          placeholder="Awards"
          value={awards}
          onChange={(e) => setAwards(e.target.value)}
        />

        {/* ORGANIZATIONS */}
        <h2 className="mt-6 font-bold text-blue-950">
          Organizations
        </h2>

        <div className="space-y-3 mt-3">
          {orgs.map((o, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-2">
              <input
                className="border p-2 rounded w-full text-blue-950"
                placeholder="Organization"
                value={o.org}
                onChange={(e) =>
                  updateOrg(i, "org", e.target.value)
                }
              />

              <input
                className="border p-2 rounded w-full text-blue-950"
                placeholder="Role"
                value={o.role}
                onChange={(e) =>
                  updateOrg(i, "role", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <button
          onClick={addOrg}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Add Organization
        </button>

        {/* OUTPUT */}
        <div className="mt-8 p-4 bg-white rounded-xl shadow text-blue-950">
          <h2 className="font-bold mb-2">
            Resume Preview (Copy & Paste)
          </h2>

          <pre className="whitespace-pre-wrap text-sm text-blue-950">
            {resumeText}
          </pre>
        </div>

      </div>
    </div>
  );
}