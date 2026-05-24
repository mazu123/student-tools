"use client";

import { useState } from "react";
import Link from "next/link";

export default function Resume() {
  const [orgs, setOrgs] = useState([
    { org: "", role: "" },
  ]);

  const addOrg = () => {
    setOrgs([...orgs, { org: "", role: "" }]);
  };

  return (
    <div className="min-h-screen p-10">
      <Link href="/">← Back</Link>

      <h1 className="text-3xl font-bold mt-4">
        Resume Builder
      </h1>

      <div className="mt-6 grid gap-2">
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Phone" />
        <input placeholder="GPA" />
        <input placeholder="SAT" />
        <input placeholder="ACT" />
        <input placeholder="Awards" />
      </div>

      <h2 className="mt-6 font-bold">Organizations</h2>

      {orgs.map((o, i) => (
        <div key={i} className="flex gap-2 mt-2">
          <input placeholder="Organization" />
          <input placeholder="Role" />
        </div>
      ))}

      <button className="mt-4" onClick={addOrg}>
        Add Organization
      </button>

      <p className="mt-6 font-semibold">
        Copy and paste into your resume document
      </p>
    </div>
  );
}