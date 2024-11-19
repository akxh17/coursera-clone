import React from "react";
import ProfileDetail from "../components/ProfileDetail";

async function ProfileDetailPage({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = await params;
  return (
    <div>
      <ProfileDetail pid={profileId} />
    </div>
  );
}

export default ProfileDetailPage;
