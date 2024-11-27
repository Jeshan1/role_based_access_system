import React from "react";
import { sideBarList } from "../constant/sidebarList";
import { useAuth } from "../context/Auth";
import { Link } from "react-router";
import Button from "./common/Button";

const Sidebar = () => {
  const { user } = useAuth();

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:4000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="flex relative flex-col w-full max-w-[250px] h-screen border-2 border-gray-300">
      {sideBarList.map((item) => {
        return (
          item.access.includes(user?.role) && (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-x-2 cursor-pointer p-3"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        );
      })}
      <div className="absolute left-5 top-[85%] cursor-pointer">
        <p className="font-semibold text-xl">{user?.username}</p>
        <p className="uppercase font-semibold">{user?.role}</p>
        <Button  onClick={logoutHandler} className="mx-1 text-sm">
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
