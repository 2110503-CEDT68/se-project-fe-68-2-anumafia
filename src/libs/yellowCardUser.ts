export default async function yellowCardUser(userId: string, token: string, reason: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backendUrl}/api/v1/users/yellowcard/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ reason })
  });

  if(!res.ok) {
    throw new Error(`Failed to yellow card user: ${res.statusText}`);
  }

  return await res.json();
}