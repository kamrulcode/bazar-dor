import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex gap-2">
      <div className="skeleton h-8 w-20"></div>
      <div className="skeleton h-8 w-28"></div>
    </div>
  );
};

export default ProfileSkeleton;
