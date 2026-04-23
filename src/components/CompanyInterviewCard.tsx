"use client";

interface CompanyInterviewCardProps {
  interview: any;
}

export default function CompanyInterviewCard({ interview }: CompanyInterviewCardProps) {
  const sessionDate = interview.sessionDate ? new Date(interview.sessionDate) : null;
  const displayDate = sessionDate ? sessionDate.toLocaleDateString("en-GB") : "N/A";
  const displayTime = sessionDate
    ? sessionDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "N/A";

  const status = interview.attendanceStatus || interview.status || "pending";

  const statusStyle =
    status === "confirmed"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "rejected"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-blue-50 text-blue-800 border-blue-200";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
          👤 {interview.user?.name || "Candidate Name"}
        </h4>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          📅 Date: <span className="font-semibold text-cyan-700">{displayDate}</span>
        </p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          🕐 Time: <span className="font-semibold text-cyan-700">{displayTime}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize border ${statusStyle}`}>
          {status}
        </span>
      </div>
    </div>
  );
}