import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CompanyForm from "@/components/CompanyForm"; 
import getCompany from "@/libs/getCompany"; 
import Link from "next/link";

export default async function AdminEditCompanyPage({ params }: { params: Promise<{ cid: string }> }) {
  const session = await getServerSession(authOptions);
  
  const { cid } = await params;

  let companyData = null;
  try {
    const res = await getCompany(cid);
    companyData = res.data || res;
  } catch (error) {
    console.error("Failed to load company for editing", error);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-28 pb-16 px-4 md:px-8 w-full animate-fade-in font-sans">
      <div className="max-w-3xl mx-auto">
        
        <Link href={`/admin/companies/${cid}`} className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm font-bold tracking-wider uppercase mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Entity Details
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Configure <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Profile</span>
          </h1>
          <p className="text-slate-400 mt-2">Update information and system parameters for {companyData?.name || "this entity"}.</p>
        </div>

        <CompanyForm initialData={companyData} companyId={cid} />

      </div>
    </div>
  );
}