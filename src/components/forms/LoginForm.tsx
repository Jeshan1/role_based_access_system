import React, { useState } from "react";
import { loginFormData } from "./constant";
import Input from "../common/Input";
import Button from "../common/Button";
import { loginDetailsType } from "../../pages/LoginPage";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";

type LoginFormProps = {
  loginDetails: loginDetailsType;
  setLoginDetails: React.Dispatch<React.SetStateAction<loginDetailsType>>;
};

const LoginForm = ({ loginDetails, setLoginDetails }: LoginFormProps) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email pattern
  const passwordRegex = /^.{6,}$/; // At least 6 characters

  const loginFormSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validation
    const newErrors: { email?: string; password?: string } = {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 5 characters long and contain at least one letter and one number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if inputs are valid

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role: loginDetails.role,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setUser(data.user);
      localStorage.setItem("token", data.token);
      toast(data.message, { type: "success" });
      navigate("/dashboard");
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-md max-w-lg mx-auto w-full p-2">
      <h1 className="text-center text-3xl font-semibold">Login Form</h1>
      <form onSubmit={loginFormSubmitHandler}>
        {loginFormData.map((item) => (
          <div key={item.name} className="mb-4">
            <Input
              inputProps={{
                placeholder: item.placeholder,
                type: item.type,
                id: item.label,
                name: item.name,
              }}
              label={item.label}
            />
            {errors[item.name as keyof typeof errors] && (
              <p className="text-red-500 text-sm">
                {errors[item.name as keyof typeof errors]}
              </p>
            )}
          </div>
        ))}
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
