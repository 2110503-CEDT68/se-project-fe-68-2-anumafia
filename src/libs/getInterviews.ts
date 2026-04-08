export default async function getInterviews(token: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const response = await fetch(`${backendUrl}/api/v1/interviews`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store" 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }

  return await response.json();
}