import CompanyCard from './CompanyCard';
import { CompanyJson } from '@/interface';

export default async function CompanyCatalog({ companiesPromise }: { companiesPromise: Promise<CompanyJson> }) {
  const companiesJson = await companiesPromise;
  
  if (!companiesJson || !companiesJson.data || companiesJson.data.length === 0) {
    return <div className="text-center text-gray-500 text-xl mt-10">No companies available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {}
      {companiesJson.data.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
}