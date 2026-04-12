"use client"

type ProfileData = {
  name?: string;
  email?: string;
  role?: string;
  tel?: string;
};

type Props = {
  profileData: ProfileData | null;
  isLoading: boolean;
  fallbackEmail?: string | null;
};

export default function ProfileCard({ profileData, isLoading, fallbackEmail }: Props) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col h-full">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Profile Information</h1>

      {isLoading ? (
        <div className="flex justify-center items-center flex-grow">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : profileData ? (
        <div className="space-y-4 text-gray-700 mt-2 flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
            <span className="font-semibold text-gray-500">Name</span>
            <span className="mt-1 sm:mt-0 text-left sm:text-right">{profileData.name || "N/A"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
            <span className="font-semibold text-gray-500">Email</span>
            <span className="mt-1 sm:mt-0 text-left sm:text-right">{profileData.email || fallbackEmail}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
            <span className="font-semibold text-gray-500">Role</span>
            <span className="capitalize mt-1 sm:mt-0 text-left sm:text-right">{profileData.role || "N/A"}</span>
          </div>
          {profileData.tel && (
            <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
              <span className="font-semibold text-gray-500">Phone</span>
              <span className="mt-1 sm:mt-0 text-left sm:text-right">{profileData.tel}</span>
            </div>
          )}
            <div className="flex justify-end">
                <button className="bg-black text-white font-bold py-1 px-5 rounded-lg hover:bg-gray-800" >Edit Profile</button>
            </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow">
          <p className="text-red-500 text-center">Failed to load profile data.</p>
        </div>
      )}
    </div>
  );
}