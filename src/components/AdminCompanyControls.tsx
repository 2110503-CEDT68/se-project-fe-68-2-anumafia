"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export interface CompanyData {
  _id: string; 
  name: string;
  address: string;
  website?: string;
  picture?: string;
}

interface AdminCompanyControlsProps {
  initialCompanies: CompanyData[];
}

export default function AdminCompanyControls({ initialCompanies }: AdminCompanyControlsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = useMemo(() => {
    if (!searchTerm.trim()) return initialCompanies;
    const lower = searchTerm.toLowerCase();
    return initialCompanies.filter(
      (comp) => comp.name.toLowerCase().includes(lower) || comp.address.toLowerCase().includes(lower)
    );
  }, [searchTerm, initialCompanies]);

  return (
    <div className="w-full flex flex-col gap-8">
      
      <div className="bg-[#111827]/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-4 px-4">
          <div className="w-12 h-12 rounded-full bg-cyan-950/50 border border-cyan-800/50 flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Entities</p>
            <p className="text-2xl font-black text-white">
              {filteredCompanies.length} <span className="text-sm font-medium text-slate-500 normal-case">companies</span>
            </p>
          </div>
        </div>
        
        <div className="relative w-full md:w-[450px] group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="block w-full py-4 pl-12 pr-4 text-base text-white bg-[#0a0f1a] border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all shadow-inner outline-none"
            placeholder="Query by company name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-[#111827]/40 border border-slate-800 border-dashed rounded-2xl">
            <span className="text-5xl mb-4 opacity-50">🔍</span>
            <p className="text-xl font-bold text-slate-400">No Match Found</p>
            <p className="text-sm text-slate-600 mt-2">Try adjusting your query parameters.</p>
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <div 
              key={company._id} 
              className="group relative bg-[#111827] border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)] hover:-translate-y-1"
            >
              <div className="h-1.5 w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-500"></div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#0a0f1a] border border-slate-700 shadow-inner flex items-center justify-center overflow-hidden relative mb-4 group-hover:scale-105 transition-transform duration-300">
                    {company.picture ? (
                      <Image src={company.picture} alt={company.name} fill className="object-cover" />
                    ) : (
                      <span className="text-3xl text-slate-600 font-black">Co.</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white line-clamp-1 w-full" title={company.name}>
                    {company.name}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-500 mt-1 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900/50">
                    ID: {company._id.slice(-6).toUpperCase()} {/* โชว์ ID สั้นๆ ให้ดูมีความเป็นระบบ Data */}
                  </span>
                </div>

                <div className="w-full h-px bg-slate-800 mb-4"></div>

                <div className="flex-grow space-y-3">
                  <div className="flex items-start gap-3 text-slate-400">
                    <svg className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <p className="text-sm line-clamp-3 leading-relaxed">{company.address || "Address not provided"}</p>
                  </div>
                  
                  {company.website && (
                    <div className="flex items-center gap-3 text-slate-400">
                      <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 truncate hover:underline">
                        {company.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <Link 
                    href={`/admin/companies/${company._id}/edit`} 
                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white text-sm font-bold rounded-xl transition-all duration-300 group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:-rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    CONFIGURE PROFILE
                  </Link>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}