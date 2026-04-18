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
    <div className="w-full bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
      
      <div className="p-6 bg-[#1e293b] border-b border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-300 font-semibold">
          Total Companies: <span className="text-cyan-400">{filteredCompanies.length}</span>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-3 pl-10 text-sm text-white bg-[#0f172a] border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-500 transition-all outline-none"
            placeholder="Search company by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[700px] overflow-y-auto custom-scrollbar">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            <p className="text-lg">No companies found matching "{searchTerm}"</p>
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <div key={company._id} className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition-all flex flex-col h-full">
              
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-slate-800 flex-shrink-0 border border-slate-700 overflow-hidden relative flex items-center justify-center">
                  {company.picture ? (
                    <Image src={company.picture} alt={company.name} fill className="object-cover" />
                  ) : (
                    <span className="text-2xl">🏢</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{company.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{company.address}</p>
                </div>
              </div>

              <div className="flex-grow"></div>

              <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center gap-2">
                <Link 
                  href={`/admin/companies/${company._id}/edit`} 
                  className="flex-1 text-center py-2 bg-slate-800 hover:bg-cyan-900/40 text-cyan-400 hover:text-cyan-300 text-sm font-semibold rounded-lg border border-slate-600 hover:border-cyan-500/50 transition-all"
                >
                  Edit Profile
                </Link>
                
                <button className="px-3 py-2 bg-slate-800 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded-lg border border-slate-600 hover:border-red-500/50 transition-all group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
              
            </div>
          ))
        )}
      </div>

    </div>
  );
}