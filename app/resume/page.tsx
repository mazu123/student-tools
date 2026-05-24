"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string;
};

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  // ----------------------------
  // LOAD SAVED DATA
  // ----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("resume");

    if (!saved) return;

    try {
      setResume(JSON.parse(saved));
    } catch {}
  }, []);

  // ----------------------------
  // AUTO SAVE
  // ----------------------------
  useEffect(() => {
    localStorage.setItem("resume", JSON.stringify(resume));
  }, [resume]);

  // ----------------------------
  // UPDATE FIELD
  // ----------------------------
  const update = (field: keyof ResumeData, value: string) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ----------------------------
  // DOWNLOAD AS PDF (simple browser method)
  // ----------------------------
  const downloadPDF = () => {
    const content = `
Resume

Name: ${resume.name}
Email: ${resume.email}
Phone: ${resume.phone}

Education:
${resume.education}

Experience:
${resume.experience}

Skills:
${resume.skills}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-stone-100 p-10 text-blue-950">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <Link href="/" className="text-sm underline text-blue-900">
          ← Back to dashboard
        </Link>

        <h1 className="text-3xl font-black mt-4">
          Resume Builder
        </h1>

        <p className="text-blue-900 mt-1">
          Build and auto-save your resume in real time.
        </p>

        {/* FORM */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow space-y-4">

          <input
            className="w-full border p-2 rounded text-blue-950"
            placeholder="Full Name"
            value={resume.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <input
            className="w-full border p-2 rounded text-blue-950"
            placeholder="Email"
            value={resume.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <input
            className="w-full border p-2 rounded text-blue-950"
            placeholder="Phone"
            value={resume.phone}
            onChange={(e) => update("phone", e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded text-blue-950"
            placeholder="Education"
            rows={3}
            value={resume.education}
            onChange={(e) => update("education", e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded text-blue-950"
            placeholder="Experience"
            rows={4}
            value={resume.experience}
            onChange={(e) => update("experience", e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded text-blue-950"
            placeholder="Skills"
            rows={3}
            value={resume.skills}
            onChange={(e) => update("skills", e.target.value)}
          />
        </div>

        {/* PREVIEW */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-3">Preview</h2>

          <div className="space-y-2 text-sm text-blue-950">
            <p><strong>Name:</strong> {resume.name || "—"}</p>
            <p><strong>Email:</strong> {resume.email || "—"}</p>
            <p><strong>Phone:</strong> {resume.phone || "—"}</p>

            <p className="mt-3"><strong>Education:</strong></p>
            <p>{resume.education || "—"}</p>

            <p className="mt-3"><strong>Experience:</strong></p>
            <p>{resume.experience || "—"}</p>

            <p className="mt-3"><strong>Skills:</strong></p>
            <p>{resume.skills || "—"}</p>
          </div>
        </div>

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={downloadPDF}
          className="mt-6 px-4 py-2 bg-blue-950 text-white rounded"
        >
          Download Resume
        </button>

      </div>
    </div>
  );
}