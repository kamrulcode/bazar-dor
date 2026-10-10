import React from "react";

const NavCategorySkeleton = () => {
  return (
    <div className="flex  gap-2 justify-center items-center mb-2 mt-3">
      <div className="skeleton h-6 w-20"></div>
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-28"></div>
    </div>
  );
};

export default NavCategorySkeleton;
