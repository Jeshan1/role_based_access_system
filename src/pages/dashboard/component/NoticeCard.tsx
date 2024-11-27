import { Trash } from "lucide-react";
import { useAuth } from "../../../context/Auth";

const NoticeCard = ({
  notice,
  title,
  id,
}: {
  notice: string;
  title: string;
  id?: string;
}) => {
  const deleteHandler = async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/notice/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      window.location.reload();
    }
  };
  const { user: loginUser } = useAuth();

  return (
    <div className="border-2 max-h-[200px] relative p-2 rounded-md text-lg overflow-hidden">
      <h1 className="text-center font-semibold my-2 text-3xl">{title}</h1>
      <p>{notice}</p>
      {["admin", "staff"].includes(loginUser.role) && (
        <Trash
          onClick={() => deleteHandler(id as string)}
          className="absolute z-10 top-1 left-1 cursor-pointer"
        />
      )}
    </div>
  );
};

export default NoticeCard;
