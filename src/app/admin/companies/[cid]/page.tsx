import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCompany from "@/libs/getCompany"; 
import Link from "next/link";

export default async function AdminCompanyDetailPage({ params }: { params: { cid: string } }) {
  const session = await getServerSession(authOptions);
  
  let company;
  try {
    const res = await getCompany(params.cid);
    company = res.data || res;
  } catch (error) {
    console.error("Error fetching company details:", error);
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] pt-28 px-8 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold text-red-500">404 - Company Not Found</h1>
        <Link href="/admin/companies" className="mt-4 text-cyan-400 hover:underline">Back to Registry</Link>
      </div>
    );
  }

  const initials = company.name.split(" ").length >= 2 
    ? (company.name.split(" ")[0][0] + company.name.split(" ")[1][0]).toUpperCase()
    : company.name.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-28 pb-16 px-4 md:px-8 w-full animate-fade-in font-sans">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/admin/companies" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm font-bold tracking-wider uppercase mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Registry
        </Link>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          
          <div className="flex flex-col md:flex-row gap-10 items-start">
            
            <div className="w-32 h-32 rounded-3xl bg-[#0a0f1a] border-2 border-slate-700 shadow-inner flex items-center justify-center flex-shrink-0">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600">
                {initials}
              </span>
            </div>

            <div className="flex-grow w-full space-y-8">
              <div>
                <h1 className="text-4xl font-black text-white mb-3">{company.name}</h1>
                <span className="inline-block px-3 py-1 bg-slate-800 text-slate-400 text-xs font-mono rounded-md border border-slate-700">
                  Entity ID: {company._id}
                </span>
              </div>

              <div className="bg-[#0a0f1a] p-6 rounded-2xl border border-slate-800/50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Company Overview
                </p>
                <p className="text-slate-300 leading-relaxed">
                  {company.description || <span className="italic text-slate-600">No company overview provided by the entity.</span>}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0f1a] p-6 rounded-2xl border border-slate-800/50">
                
                <div className="md:col-span-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Registered Address</p>
                  <p className="text-slate-300 font-medium">{company.address || "No address on file"}</p>
                </div>
                
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Telephone</p>
                  <p className="text-cyan-400 font-mono font-medium">{company.tel || "N/A"}</p>
                </div>

                <div className="md:col-span-3 pt-4 border-t border-slate-800/50">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Official Website</p>
                  {company.website ? (
                    <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-cyan-300 font-medium transition-colors">
                      {company.website}
                    </a>
                  ) : (
                    <p className="text-slate-500 italic">No website provided</p>
                  )}
                </div>

              </div>

              <div className="pt-4 flex gap-4">
                <Link href={`/admin/companies/${company._id}/edit`} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  Edit Information
                </Link>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}