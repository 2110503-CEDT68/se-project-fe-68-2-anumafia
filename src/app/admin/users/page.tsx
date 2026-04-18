import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getAllUsers from "@/libs/getAllUsers";
import AdminUserManage from "@/components/AdminUserManage";
import Link from "next/link";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  
  let users = [];
  try {
    const res = await getAllUsers(session?.user?.token as string);
    users = res.data || res; 
  } catch (error) {
    console.error("Failed to load users:", error);
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <Link href="/admin" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm font-semibold transition-colors w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Command Center
        </Link>
      </div>

      <AdminUserManage initialUsers={users} />
    </div>
  );
}