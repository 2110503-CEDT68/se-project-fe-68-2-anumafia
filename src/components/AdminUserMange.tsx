"use client";

import { useState, useMemo } from "react";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  telephone: string;
  createdAt?: string;
}

interface AdminUserManageProps {
  initialUsers: UserData[];
}

export default function AdminUserManage({ initialUsers }: AdminUserManageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return initialUsers;
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    return initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseSearch) ||
        user._id.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, initialUsers]);

  const toggleUserExpand = (id: string) => {
    setExpandedUserId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#0f172a] text-slate-200 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden font-sans">
      
      <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-[#1e293b] border-b border-slate-700">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            User Management
          </h2>
          <span className="ml-3 px-3 py-1 text-xs font-semibold bg-slate-700 text-cyan-400 rounded-full">
            Total: {filteredUsers.length}
          </span>
        </div>

        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-3 pl-10 text-sm text-white bg-[#0f172a] border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-500 transition-all shadow-inner outline-none"
            placeholder="Search by User Name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className={`flex flex-col border rounded-xl transition-all duration-300 ease-in-out ${
                  expandedUserId === user._id 
                    ? "bg-[#1e293b] border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                    : "bg-[#0f172a] border-slate-700 hover:border-slate-500 hover:bg-[#162032]"
                }`}
              >
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleUserExpand(user._id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-lg font-bold text-white tracking-wide">
                      {user.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                      ID: {user._id}
                    </span>
                  </div>
                  
                  <div className={`text-slate-400 transition-transform duration-300 ${expandedUserId === user._id ? "rotate-180 text-cyan-400" : ""}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>

                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedUserId === user._id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-2 border-t border-slate-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-5 rounded-lg border border-slate-800">
                      
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</p>
                        <p className="text-sm font-medium text-white">{user.email}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</p>
                        <p className="text-sm font-medium text-slate-300">{user.telephone || "-"}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Role</p>
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' : 'bg-blue-900/50 text-blue-300 border border-blue-700'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-end justify-end space-x-3 mt-2 md:mt-0">
                        <button className="px-4 py-2 text-sm font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600">
                          Edit Detail
                        </button>
                        <button className="px-4 py-2 text-sm font-bold text-red-400 bg-red-950/30 hover:bg-red-900/50 rounded-lg transition-colors border border-red-900/50">
                          Suspend
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
      `}} />
    </div>
  );
}