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
${orgs
  .map((o) => `- ${o.org} (${o.role})`)
  .join("\n")}
  `;

  return (
    <div className="min-h-screen p-10 bg-stone-100">
      <div className="max-w-4xl mx-auto">

        <Link href="/" className="text-sm underline">
          ← Back
        </Link>

        <h1 className="text-3xl font-black mt-4">
          Resume Builder
        </h1>

        <p className="text-slate-600 mt-1">
          Fill in your information and generate a clean resume format.
        </p>

        {/* Personal Info */}
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <Input placeholder="Full Name" value={name} set={setName} />
          <Input placeholder="Email" value={email} set={setEmail} />
          <Input placeholder="Phone" value={phone} set={setPhone} />
          <Input placeholder="GPA" value={gpa} set={setGpa} />
          <Input placeholder="SAT Score" value={sat} set={setSat} />
          <Input placeholder="ACT Score" value={act} set={setAct} />
        </div>

        <textarea
          className="w-full mt-3 p-2 border rounded"
          placeholder="Awards"
          value={awards}
          onChange={(e) => setAwards(e.target.value)}
        />

        {/* Organizations */}
        <h2 className="mt-6 font-bold">Organizations</h2>

        <div className="space-y-3 mt-3">
          {orgs.map((o, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Organization"
                value={o.org}
                onChange={(e) =>
                  updateOrg(i, "org", e.target.value)
                }
              />
              <input
                className="border p-2 rounded"
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

        {/* Output */}
        <div className="mt-8 p-4 bg-white rounded-xl shadow">
          <h2 className="font-bold mb-2">
            Resume Preview (Copy & Paste)
          </h2>
          <pre className="whitespace-pre-wrap text-sm text-slate-700">
            {resumeText}
          </pre>
        </div>

      </div>
    </div>
  );
}

/* ---------- SMALL SAFE INPUT COMPONENT ---------- */

function Input({
  placeholder,
  value,
  set,
}: {
  placeholder: string;
  value: string;
  set: (v: string) => void;
}) {
  return (
    <input
      className="border p-2 rounded w-full"
      placeholder={placeholder}
      value={value}
      onChange={(e) => set(e.target.value)}
    />
  );
}