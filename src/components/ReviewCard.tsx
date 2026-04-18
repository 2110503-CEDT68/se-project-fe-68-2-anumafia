"use client"

import { useState } from "react";
import { ReviewItem, CompanyItemForReview, UserItemForReview } from "@/interface";
import { useRouter } from "next/navigation";

export default function ReviewCard({ initialReviews, token, role }: { initialReviews: ReviewItem[], token: string, role?: string }) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState<string>("");
  const router = useRouter();

  const isAdmin = role === "admin";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Review?")) return;
    try {
      const res = await fetch(`${backendUrl}/api/v1/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete review");
      
      setReviews(reviews.filter(b => b._id !== id));
      alert("Review deleted successfully.");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };


  if (!reviews || reviews.length === 0) {
    return <div className="text-center text-2xl text-gray-500 mt-16 font-semibold">No review found.</div>;
  }

  return (
    <div className="space-y-6">
      {reviews.map(review => {
        const company = review.company as CompanyItemForReview;
        const displayDate = new Date(review.createdAt).toLocaleDateString('en-GB');

        return (
          <div key={review._id} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-cyan-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:shadow-lg">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between w-full mb-2">
                <div className="text-2xl font-bold text-gray-900">
                  {company?.name || "Unknown Company"}
                </div>
                
                <div className="flex items-center gap-3 ml-auto">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-xl ${
                        Number(review.rating) >= star ? "text-yellow-400" : "text-gray-300"
                      }`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white px-3 py-2 text-sm rounded-lg font-medium hover:bg-red-600 transition shadow-sm"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
              
              {}
            
              <div className="space-y-1.5 mt-2">
                <p className="flex items-center gap-2"> <span className="text-2xl w-20 whitespace-nowrap"> {(review.user as UserItemForReview).name || "N/A"} </span> </p>
                <p className="flex items-start gap-2"> <span className="text-xl text-gray-500 te break-words"> {review.reviewText || "N/A"} </span> </p>
              </div>
              
             <div className="mt-5 inline-block bg-cyan-50 border border-cyan-100 px-4 py-2.5 rounded-lg">
                  <p className="text-lg font-bold text-cyan-800 flex items-center gap-2">
                    <span>🗓️</span> Review Date: {displayDate}
                  </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}