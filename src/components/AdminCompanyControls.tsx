"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export interface CompanyData {
  _id: string; 
  name: string;
  address: string;
  website?: string;
  description?: string;
  tel?: string;
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
      (comp) => 
        comp.name.toLowerCase().includes(lower) || 
        comp.address.toLowerCase().includes(lower) ||
        (comp.description && comp.description.toLowerCase().includes(lower)) 
    );
  }, [searchTerm, initialCompanies]);

  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

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
            <svg className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            className="block w-full py-4 pl-12 pr-4 text-base text-white bg-[#0a0f1a] border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all outline-none"
            placeholder="Query by company name, address, or details..."
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
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <div key={company._id} className="group relative bg-[#111827] border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)] hover:-translate-y-1">
              
              <div className="h-1.5 w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-500"></div>
              
              <div className="p-6 flex flex-col flex-grow">
                
                <Link href={`/admin/companies/${company._id}`} className="flex flex-col items-center text-center mb-5 cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl bg-[#0a0f1a] border border-slate-700 shadow-inner flex items-center justify-center overflow-hidden relative mb-4 group-hover:scale-105 group-hover:border-cyan-500/50 transition-all duration-300">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">
                      {getInitials(company.name)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white line-clamp-1 w-full group-hover:text-cyan-400 transition-colors" title={company.name}>
                    {company.name}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-500 mt-1 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900/50">
                    ID: {company._id.slice(-6).toUpperCase()}
                  </span>
                </Link>

                <div className="w-full h-px bg-slate-800 mb-4"></div>

                <div className="flex-grow space-y-3">
                  <p className="text-sm text-slate-400 line-clamp-2 italic mb-4">
                    "{company.description || "No description provided."}"
                  </p>

                  <div className="flex items-start gap-3 text-slate-400">
                    <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <p className="text-xs line-clamp-1">{company.address || "No address"}</p>
                  </div>
                  
                  {company.tel && (
                    <div className="flex items-center gap-3 text-slate-400">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      <p className="text-xs font-mono">{company.tel}</p>
                    </div>
                  )}

                  {company.website && (
                    <div className="flex items-center gap-3 text-slate-400">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 truncate hover:underline relative z-10">
                        {company.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <Link href={`/admin/companies/${company._id}/edit`} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white text-sm font-bold rounded-xl transition-all duration-300 group/btn relative z-10">
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