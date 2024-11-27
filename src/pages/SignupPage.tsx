import React, { useEffect, useState } from "react";
import RoleSelector from "../components/RoleSelector";
import SignupForm from "../components/forms/SignupForm";
import { loginDetailsType } from "./LoginPage";
import { twMerge } from "tailwind-merge";

export type signupDetailsType = {
  email: string;
  password: string;
  username: string;
  role: "admin" | "patient" | "doctor" | "staff";
};

const SignupPage = ({ className }: { className: string }) => {
  const [signupDetails, setSignupDetails] = useState<signupDetailsType>({
    email: "",
    password: "",
    username: "",
    role: "admin",
  });
  const [role, setRole] = useState<"admin" | "patient" | "doctor" | "staff">(
    "admin"
  );

  useEffect(() => {
    setSignupDetails((prv) => ({
      ...prv,
      role,
    }));
  }, [role]);
  console.log(signupDetails);
  return (
    <div
      className={twMerge(
        "w-full  flex items-center justify-center flex-col",
        className
      )}
    >
      <RoleSelector role={role} setRole={setRole} />
      <SignupForm
        signupDetails={signupDetails}
        setSignupDetails={setSignupDetails}
      />
    </div>
  );
};

export default SignupPage;
