import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 tracking-tight">
          Command Center
        </h1>
        <p className="text-slate-400 text-lg">Select a module to manage platform resources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Link href="/admin/companies" className="group relative bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all overflow-hidden flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏢</div>
          <h2 className="text-xl font-bold text-white mb-2">Company</h2>
          <p className="text-sm text-slate-500">Manage registered companies and their profiles.</p>
        </Link>

        <Link href="/admin/interviews" className="group relative bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all overflow-hidden flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🗓️</div>
          <h2 className="text-xl font-bold text-white mb-2">Interview</h2>
          <p className="text-sm text-slate-500">Monitor and manage interview schedules.</p>
        </Link>

        <Link href="/admin/users" className="group relative bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> {/* Notification dot */}
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">👥</div>
          <h2 className="text-xl font-bold text-white mb-2">User Manage</h2>
          <p className="text-sm text-slate-500">Control user accounts, roles, and platform security.</p>
        </Link>

      </div>
    </div>
  );
}