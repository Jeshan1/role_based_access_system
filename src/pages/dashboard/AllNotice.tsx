import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import NoticeCard from "./component/NoticeCard";

const AllNotice = () => {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    const getNotice = async () => {
      const res = await fetch("http://localhost:4000/api/notice/getallnotice", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setNotice(data.allNotice);
      }
    };
    getNotice();
  }, []);
  console.log(notice);
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="grid grid-cols-3 gap-3 w-full p-3">
      {notice?.map((notice: any) => {
        console.log(notice);
        return (
          <NoticeCard
            id={notice._id}
            title={notice.title}
            key={notice._id}
            notice={notice.notice}
          />
        );
      })}
    </div>
  );
};

export default AllNotice;
