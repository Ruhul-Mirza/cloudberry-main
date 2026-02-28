"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle,
  Calendar,
  User,
  GraduationCap,
  ShieldCheck,
  Download,
  Share2,
} from "lucide-react";

/* ===== DATE FORMAT (UNCHANGED LOGIC) ===== */
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
};

export default function VerifyCertificate() {
  const { certificateId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
      .then((res) => res.json())
      .then((result) => {
        const list = Array.isArray(result?.data) ? result.data : [];
        setCourses(list);
      })
      .catch(() => {});
  }, []);
  /* ===== FETCH LOGIC (UNCHANGED) ===== */
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/certificates/verify/${certificateId}`,
    )
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          setError(result.message);
        } else {
          (console.log(result?.data?.[0]?.[0]), "checkinf");
          setData(result?.data?.[0]?.[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  }, [certificateId]);

  /* ===== LOADING UI ===== */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-4 animate-pulse">
          <div className="h-24 bg-white rounded-xl border" />
          <div className="h-72 bg-white rounded-xl border" />
          <div className="h-[500px] bg-white rounded-xl border" />
        </div>
      </div>
    );
  }

  /* ===== ERROR UI ===== */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border rounded-xl p-6 max-w-md w-full">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Verification Failed
          </h2>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  /* ===== MAIN UI ===== */
  const matchedCourse = courses.find(
    (c) => String(c.id) === String(data?.course_id),
  );
  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10 px-3 md:px-6">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* HEADER */}
        <div className="bg-white border rounded p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="text-green-600 w-8 h-8" />
            </div>

            <div className="flex-1 min-w-[200px]">
              <h1 className="text-xl md:text-2xl font-bold">
                Certificate Verified
              </h1>
              <p className="text-sm text-gray-500">
                This certificate is authentic and verified successfully.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <ShieldCheck size={16} />
              Verified
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-white border rounded p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-5">Certificate Details</h2>

          <div className="space-y-4">
            <InfoRow
              icon={<User size={18} />}
              label="Student Name"
              value={data.student_name}
            />
            <InfoRow
              icon={<GraduationCap size={18} />}
              label="Course"
              value={matchedCourse?.title || "N/A"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow
                icon={<Calendar size={18} />}
                label="Start Date"
                value={formatDate(data.start_date)}
              />
              <InfoRow
                icon={<Calendar size={18} />}
                label="End Date"
                value={formatDate(data.end_date)}
              />
            </div>

            <InfoRow
              icon={<Calendar size={18} />}
              label="Issued On"
              value={formatDate(data.created_at)}
            />
          </div>
        </div>

        {/* PREVIEW */}
        <div className="bg-white border rounded p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Certificate Preview</h2>

          <div className="overflow-hidden rounded border">
            <iframe
              src={`${process.env.NEXT_PUBLIC_API_URL}/certificates/preview/${certificateId}`}
              className="w-full h-[600px]"
              title="Certificate Preview"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap justify-end gap-3">
          {/* <button className="border rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-gray-100 transition">
            <span className="inline-flex items-center gap-2">
              <Share2 size={16} />
              Share
            </span>
          </button> */}

          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/certificates/preview/${certificateId}`}
            target="_blank"
            className="bg-black text-white rounded px-5 py-2.5 text-sm font-semibold hover:bg-black/90 transition inline-flex items-center gap-2"
          >
            <Download size={16} />
            Download Certificate
          </a>
        </div>
      </div>
    </div>
  );
}

/* ===== INFO ROW ===== */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="p-2 bg-gray-100 rounded-md text-gray-700">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
          {label}
        </p>
        <p className="text-sm md:text-base font-semibold text-gray-900">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}
