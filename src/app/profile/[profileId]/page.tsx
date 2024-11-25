import React from "react";
import ProfileDetail from "@/app/components/ProfileDetail";

async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const profileId = (await params).profileId;
  return (
    <div>
      <ProfileDetail pid={profileId} />
    </div>
  );
}

export default ProfileDetailPage;
