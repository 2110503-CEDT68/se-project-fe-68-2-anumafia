import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CompanyForm from "@/components/CompanyForm"; 
import Link from "next/link";

export default async function AdminCreateCompanyPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-28 pb-16 px-4 md:px-8 w-full animate-fade-in font-sans">
      <div className="max-w-3xl mx-auto">
        
        <Link href="/admin/companies" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm font-bold tracking-wider uppercase mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Registry
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Register New <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Entity</span>
          </h1>
          <p className="text-slate-400 mt-2">Initialize a new corporate partner into the JobFair platform.</p>
        </div>

        <CompanyForm />

      </div>
    </div>
  );
}