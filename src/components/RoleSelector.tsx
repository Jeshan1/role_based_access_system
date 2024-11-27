import React from "react";
import Button from "./common/Button";
const roles = ["Admin", "Doctor", "Staff", "Patient"];

export type SelectorProps = {
  role: "doctor" | "staff" | "patient" | "admin";
  setRole: React.Dispatch<
    React.SetStateAction<"doctor" | "staff" | "patient" | "admin">
  >;
};

const RoleSelector = ({ role, setRole }: SelectorProps) => {
  const selectorHandler = (item: "doctor" | "staff" | "patient" | "admin") => {
    setRole(item);
    };
    console.log(role)
  return (
    <div className="flex gap-x-2 max-w-lg w-full mx-auto my-2">
      {roles.map((item) => (
        <Button
          key={item}
          className={role == item ? "bg-black" : ""}
          onClick={() =>
            selectorHandler(item as "doctor" | "staff" | "patient" | "admin")
          }
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default RoleSelector;
