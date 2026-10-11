import { Metadata } from "next";
import ProfileUpdate from "./ProfileUpdate";

export const metadata: Metadata = {
  title: "প্রোফাইল",
};
export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 text-[#253029]">
      <ProfileUpdate />
    </main>
  );
}
