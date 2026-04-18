"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface CompanyFormProps {
  initialData?: {
    _id?: string;
    name: string;
    address: string;
    website: string;
    tel: string;
    description: string;
  };
  companyId?: string;
}

export default function CompanyForm({ initialData, companyId }: CompanyFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isEditing = !!companyId;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    address: initialData?.address || "",
    website: initialData?.website || "",
    tel: initialData?.tel || "",
    description: initialData?.description || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const url = isEditing 
        ? `${backendUrl}/api/v1/companies/${companyId}` 
        : `${backendUrl}/api/v1/companies`;
      const method = isEditing ? "PUT" : "POST";

      const token = (session?.user as any)?.token; 

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to save company data");
      }

      router.refresh(); 
      router.push("/admin/companies");
      
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Failed to update company. Please check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name <span className="text-cyan-500">*</span></label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name} 
              onChange={handleChange}
              placeholder="e.g. MacGyver and Sons"
              className="w-full bg-[#0a0f1a] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder-slate-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Telephone</label>
            <input 
              type="text" 
              name="tel"
              value={formData.tel} 
              onChange={handleChange}
              placeholder="e.g. 639-378-3474"
              className="w-full bg-[#0a0f1a] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder-slate-600 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Website URL</label>
            <input 
              type="url" 
              name="website"
              value={formData.website} 
              onChange={handleChange}
              placeholder="e.g. https://norberto.net"
              className="w-full bg-[#0a0f1a] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder-slate-600"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registered Address</label>
            <input 
              type="text" 
              name="address"
              value={formData.address} 
              onChange={handleChange}
              placeholder="e.g. 2054 Tierra Ways"
              className="w-full bg-[#0a0f1a] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder-slate-600"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Description</label>
            <textarea 
              name="description"
              rows={4}
              value={formData.description} 
              onChange={handleChange}
              placeholder="Provide a brief overview of the company..."
              className="w-full bg-[#0a0f1a] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder-slate-600 resize-none custom-scrollbar"
            ></textarea>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-end gap-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {isEditing ? "Save Configuration" : "Register Entity"}
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}