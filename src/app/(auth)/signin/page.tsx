import React, { Suspense } from "react";
import SignIn from "./SignIn";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "সাইন ইন",
};

const SignInPage = () => {
  return (
    <div className="">
      <Suspense fallback={<ProductGridSkeleton />}>
        <SignIn />
      </Suspense>
    </div>
  );
};

export default SignInPage;
