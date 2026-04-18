export default async function getCompanies() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const response = await fetch(`${backendUrl}/api/v1/companies`, {
    method: "GET",
    cache: "no-store", 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return await response.json();
}