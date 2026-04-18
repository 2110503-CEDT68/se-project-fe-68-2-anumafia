export default async function getAllUsers(token: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const response = await fetch(`${backendUrl}/api/v1/users`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store", 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all users. Please check backend connection.");
  }

  return await response.json();
}