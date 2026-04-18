// src/app/admin/page.tsx
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
        
        <Link href="/admin/companies" className="group relative bg-[#0f172a] border border-slate-700 rounded-3xl p-8 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all overflow-hidden flex flex-col items-center text-center h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all shadow-lg border border-slate-700/50">🏢</div>
          <h2 className="text-2xl font-bold text-white mb-3">Manage Companies</h2>
          <p className="text-sm text-slate-400 leading-relaxed">Add, edit, or remove participating companies and verify their profiles.</p>
        </Link>

        <Link href="/admin/interviews" className="group relative bg-[#0f172a] border border-slate-700 rounded-3xl p-8 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all overflow-hidden flex flex-col items-center text-center h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all shadow-lg border border-slate-700/50">🗓️</div>
          <h2 className="text-2xl font-bold text-white mb-3">Interview Sessions</h2>
          <p className="text-sm text-slate-400 leading-relaxed">Monitor platform-wide booking schedules and manage session capacities.</p>
        </Link>

        <Link href="/admin/users" className="group relative bg-[#0f172a] border border-slate-700 rounded-3xl p-8 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all overflow-hidden flex flex-col items-center text-center h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-5 right-5 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all shadow-lg border border-slate-700/50">👥</div>
          <h2 className="text-2xl font-bold text-white mb-3">User Control</h2>
          <p className="text-sm text-slate-400 leading-relaxed">Audit user accounts, enforce security protocols, and manage permissions.</p>
        </Link>

      </div>
    </div>
  );
}