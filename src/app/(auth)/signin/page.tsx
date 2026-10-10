import React, { Suspense } from "react";
import SignIn from "./SignIn";

const SignInPage = () => {
  return (
    <div className="">
      <Suspense fallback={"loading.."}>
        <SignIn />
      </Suspense>
    </div>
  );
};

export default SignInPage;
