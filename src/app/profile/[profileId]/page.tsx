import React from "react";
import ProfileDetail from "@/app/components/ProfileDetail";

async function ProfileDetailPage(context: { params: { profileId: string } }) {
  const { profileId } = context.params;
  return (
    <div>
      <ProfileDetail pid={profileId} />
    </div>
  );
}

export default ProfileDetailPage;
