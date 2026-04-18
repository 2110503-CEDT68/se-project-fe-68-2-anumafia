// src/app/admin/companies/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCompanies from "@/libs/getCompanies"; 
import Link from "next/link";
import AdminCompanyControls from "@/components/AdminCompanyControls"; 

export default async function AdminCompaniesPage() {
  const session = await getServerSession(authOptions);
  
  let companies = [];
  try {
    const res = await getCompanies();
    companies = res.data || res; 
  } catch (error) {
    console.error("Failed to load companies:", error);
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <Link href="/admin" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm font-semibold transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Command Center
        </Link>
        
        <Link href="/admin/companies/create" className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Add New Company
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span className="text-4xl">🏢</span> Manage Companies
        </h1>
        <p className="text-slate-400 mt-2">Control registered companies, edit details, or remove them from the platform.</p>
      </div>
      
      <AdminCompanyControls initialCompanies={companies} />
    </div>
  );
}