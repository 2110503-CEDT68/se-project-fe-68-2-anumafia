import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getReviews from "@/libs/getReviews";
import ReviewCard from "@/components/ReviewCard";

export default async function MyBookingPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border-t-4 border-cyan-600">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 text-lg">Please Sign-In as admin to view.</p>
        </div>
      </main>
    );
  }

  const ReviewsData =/* //await getReviews(session.user.token);  //mock data for now */{
    success: true,
    count: 3,
    data: [
      {
        _id: "69de2cfce4cc2d1772500a01",
        user: {
          _id: "69da7dad2200525e28c0966f",
          name: "admin"
        },
        company: {
          _id: "69c1a9fd3a00d34813edfccd",
          name: "MacGyver and Sons"
        },
        rating: 5,
        reviewText: "สวัสดี",
        createdAt: "2026-04-14T12:03:08.054Z",
      },
      {
        _id: "69db45afc22e498ed78cdf28",
        user: {
          _id: "69c1aa5e3a00d34813edfce4",
          name: "Lyle Schuster"
        },
        company:{
          _id: "69c1aa003a00d34813edfcd3",
          name: "Kertzmann - Bergnaum"
        },
        rating: 5,
        reviewText: "nice job long test ;lkjasd;lkas;dlk ;alskd;asldkas;d a;sldksl;jdfgns;vlkns 'a;ldjasd;amcxlakn ;alkdjas;ldknas;ldkajsd ,x.mcnzx,.cmnzxc.,mzxnc;alkjdfhas;lkdh .,zx.cmnzxcn;aldkfhj .zx,mcnxz.,cmnae;ldkfjhasl;dkcz.,mxnc.,zxmnca;sldkhas ;lkhxzc.,mzxnc.xz,mcnzx.,cm na;ldihasd;lknczxl,nxz",
        createdAt: "2026-04-12T07:11:43.800Z",
      },
      {
        _id: "69dd32bd8b3e6e3f9f5801f9",
        user: {
          _id: "69c1aa5e3a00d34813edfce4",
          name: "Lyle Schuster"
        },
        company:{
          _id: "69c1a9f13a00d34813edfcb5",
          name: "Parker Group"
        },
        rating: 3,
        reviewText: "yuihjokl;",
        createdAt: "2026-04-13T18:15:25.732Z",
      }
    ]
  };
  const isAdmin = session.user.role === "admin";

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {isAdmin ? (
              <>Admin <span className="text-red-600">Manage Review</span></>
            ) : (
              <></>
            )}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {isAdmin 
              ? "Manage all review across the system. You have full control." 
              : ""}
          </p>
        </div>
        
        {}
        <ReviewCard
          initialReviews={ReviewsData?.data || []} 
          token={session.user.token} 
          role={session.user.role} 
        />
        
      </div>
    </main>
  );
}