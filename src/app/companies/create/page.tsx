import CompanyAccountForm from "@/components/CompanyAccountForm";

export default function CreateCompanyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <span className="inline-block py-1.5 px-4 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-4 tracking-widest uppercase shadow-sm">
            Admin Only
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Create Company Account
          </h1>
          <p className="text-slate-500 mt-3">
            Register a new company account. The company will be hidden (Unpublished) until they complete their profile.
          </p>
        </div>

        <CompanyAccountForm />
        
      </div>
    </main>
  );
}