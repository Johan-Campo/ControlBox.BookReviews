import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { getMyProfile } from "@/lib/api/users";
import { getSessionToken } from "@/lib/session";
import { ProfilePhotoForm } from "./profile-photo-form";

export const metadata: Metadata = {
  title: "Mi perfil — BookReviews",
};

export default async function ProfilePage() {
  const token = await getSessionToken();
  if (!token) redirect("/login");

  const profile = await getMyProfile(token);
  if (!profile) redirect("/login");

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-8">
      <h1 className="text-2xl font-bold">Mi perfil</h1>

      <div className="flex items-center gap-4">
        <Avatar username={profile.username} photoUrl={profile.profilePhotoUrl} size={80} />
        <div>
          <p className="text-lg font-semibold">{profile.username}</p>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
      </div>

      <ProfilePhotoForm currentPhotoUrl={profile.profilePhotoUrl} />
    </main>
  );
}
