import CompanyForm from "@/components/CompanyForm";
import getCompany from "@/libs/getCompany";

export default async function EditCompanyPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  const companyDetail = await getCompany(cid);

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Edit Company</h1>
        <CompanyForm company={companyDetail.data} />
      </div>
    </main>
  );
}