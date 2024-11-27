import React, { useEffect, useState } from "react";
import LoginForm from "../components/forms/LoginForm";

export type loginDetailsType = {
  email: string;
  password: string;
  role: "admin" | "patient" | "doctor" | "staff";
};

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState<loginDetailsType>({
    email: "",
    password: "",
    role: "admin",
  });
  const [role, setRole] = useState<"admin" | "patient" | "doctor" | "staff">(
    "admin"
  );

  useEffect(() => {
    setLoginDetails((prv) => ({
      ...prv,
      role,
    }));
  }, [role]);

  console.log(loginDetails);
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      {/* <RoleSelector role={role} setRole={setRole} /> */}
      <LoginForm
        loginDetails={loginDetails}
        setLoginDetails={setLoginDetails}
      />
    </div>
  );
};

export default LoginPage;
