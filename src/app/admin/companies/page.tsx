import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCompanies from "@/libs/getCompanies"; 
import Link from "next/link";
import AdminCompanyControls from "@/components/AdminCompanyControls"; 

export const dynamic = "force-dynamic";

export default async function AdminCompaniesPage() {
  const session = await getServerSession(authOptions);
  
  let companies = [];
  try {
    const res = await getCompanies();
    companies = res.data || res; 
  } catch (error) {
    console.error("Failed to load companies (Admin View):", error);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-28 pb-16 px-4 md:px-8 lg:px-12 w-full animate-fade-in font-sans">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 border-b border-slate-800 pb-6">
          
          <div className="space-y-2">
            <Link 
              href="/admin" 
              className="group flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm font-bold tracking-wider uppercase transition-all"
            >
              <span className="p-1.5 rounded-md bg-cyan-950/50 group-hover:bg-cyan-900/50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </span>
              Back to Command Center
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-4">
              <span className="text-5xl drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">🏢</span> 
              Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Companies</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
              Centralized hub for managing corporate partners. Monitor registered entities, update profile configurations, or enforce platform integrity.
            </p>
          </div>
          
          <Link 
            href="/admin/companies/create" 
            className="group relative px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-black rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="bg-slate-900 text-white p-1 rounded-md group-hover:bg-cyan-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
            </span>
            REGISTER NEW COMPANY
          </Link>
        </div>

        <AdminCompanyControls initialCompanies={companies} />
        
      </div>
    </div>
  );
}