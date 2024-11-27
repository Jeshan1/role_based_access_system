import React, { useState } from "react";
import { signupFormData } from "./constant";
import Input from "../common/Input";
import Button from "../common/Button";
import { signupDetailsType } from "../../pages/SignupPage";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type SignUpFormProps = {
  signupDetails: signupDetailsType;
  setSignupDetails: React.Dispatch<React.SetStateAction<signupDetailsType>>;
};

const SignupForm = ({ signupDetails, setSignupDetails }: SignUpFormProps) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    username?: string;
  }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
  const passwordRegex = /^.{6,}$/; // At least 6 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric, 3-20 characters

  const signupFormSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    // Validation
    const newErrors: { email?: string; password?: string; username?: string } =
      {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one letter and one number.";
    }
    if (!usernameRegex.test(username)) {
      newErrors.username =
        "Username must be 3-20 characters long and contain only letters, numbers, or underscores.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
        role: signupDetails.role.toLowerCase(),
      }),
    });
    const data = await response.json();
    if (data?.success) {
      toast(data.message, { type: "success" });
      window.location.reload();
      navigate("/dashboard");
    } else {
      toast(data.error, { type: "error" });
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-md max-w-lg mx-auto w-full p-2">
      <h1 className="text-center text-3xl font-semibold">Signup Form</h1>
      <form onSubmit={signupFormSubmitHandler} className="">
        {signupFormData.map((item) => (
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
        <Button>SignUp</Button>
      </form>
    </div>
  );
};

export default SignupForm;
