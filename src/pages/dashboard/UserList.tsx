import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import AddUserPopup from "./component/AddUserPopup";
import { useAuth } from "../../context/Auth";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:4000/api/user/alluser");
      const data = await response.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  const deleteHandler = async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/user/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  const assignRoleHandler = async (id: string, newRole: string) => {
    const response = await fetch(`http://localhost:4000/api/user/${id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ role: newRole }),
    });

    const data = await response.json();
    console.log(data);

    if (data?.success) {
      window.location.reload();
    }
  };
  console.log(loggedInUser?.role);

  return (
    <div className="w-full p-3">
      {(loggedInUser?.role == "admin" || loggedInUser?.role == "staff") && (
        <Button onClick={() => setOpen(true)} className="w-fit px-3 my-3 mx-2">
          Add User
        </Button>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-2 border-gray-300 bg-gray-200">
            <th className="border-2 p-2">Username</th>
            <th className="border-2 p-2">Email</th>
            <th className="border-2 p-2">Role</th>
            {loggedInUser?.role === "admin" && (
              <th className="border-2 p-2">Assign Role</th>
            )}
            {loggedInUser?.role === "admin" && (
              <th className="border-2 p-2">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            const isSelf = loggedInUser?._id === user._id;
            return (
              <tr
                key={user._id}
                className={`border-2 ${
                  isSelf ? "bg-gray-300 text-gray-500" : "text-black"
                }`}
              >
                <td className="border-2 text-center p-2">{user.username}</td>
                <td className="border-2 text-center p-2">{user.email}</td>
                <td className="border-2 text-center p-2">{user.role}</td>
                {loggedInUser?.role === "admin" && (
                  <td className="border-2 text-center p-2">
                    <div className="flex items-center justify-center gap-2">
                      <select
                        className={`w-full max-w-[200px] cursor-pointer p-2 border-2 border-gray-300 rounded-md focus:outline-none ${
                          isSelf ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        value={user?.role}
                        onChange={(e) =>
                          !isSelf && assignRoleHandler(user._id, e.target.value)
                        }
                        disabled={isSelf}
                      >
                        <option value="admin">Admin</option>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="staff">Staff</option>
                      </select>
                    </div>
                  </td>
                )}
                {loggedInUser?.role === "admin" && (
                  <td className="border-2 text-center p-2">
                    <button
                      onClick={() => !isSelf && deleteHandler(user._id)}
                      className={`py-1 px-3 rounded-md transition-colors ${
                        isSelf
                          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                      disabled={isSelf}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <AddUserPopup open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserList;
