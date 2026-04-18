"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserControls from "@/components/UserControls";
import getUsers from "@/libs/getUsers";
import { UserItem, UserJson } from "@/interface";

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserItem[] | null>(null);


	if(!session || !session.user){
		return (
			<div className="p-8">
				<h1 className="text-2xl font-bold mb-6">User List</h1>
				<p className="text-gray-500">Please log in to view users.</p>
			</div>
		);
	}

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(session.user.token) as UserJson;
			console.log(users.data[0]);
			
      setUsers(users.data);
    };

    if (session) fetchUsers();
  }, [session]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User List</h1>

      {users?.map((user) => {

				if(user.role === 'admin') return null; // ไม่แสดง admin ใน list

				return (
					<div key={user._id} className="border p-4 flex justify-between mb-3 rounded-lg">
						
						<div>
							<p className="font-semibold">{user.name}</p>
							<p className="text-gray-500 text-sm">{user.email}</p>

							{/* 🚫 BAN FIRST (priority สูงสุด) */}
							{user.ban?.isBanned ? (
								<div className="text-red-500 font-bold">
									🚫 BANNED
									{user.ban?.reason && (
										<p className="text-sm font-normal">
											Reason: {user.ban.reason}
										</p>
									)}
								</div>
							) : (
								<>
									{/* 🟡 Yellow (แสดงเฉพาะ 1–2 เท่านั้น) */}
									{user.yellowCards?.count > 0 && user.yellowCards?.count < 3 && (
										<p className="text-yellow-600 font-medium">
											🟡 Yellow: {user.yellowCards.count}/3
										</p>
									)}
								</>
							)}
						</div>

						<UserControls user={user} token={session.user.token}/>
					</div>
				)
		})}
    </div>
  );
}