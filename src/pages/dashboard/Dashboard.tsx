import React, { useEffect, useState } from "react";
import NoticeCard from "./component/NoticeCard";

const Dashboard = () => {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    const getNotice = async () => {
      const res = await fetch("http://localhost:4000/api/notice/getmynotice", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setNotice(data.notice);
      }
    };
    getNotice();
  }, []);
  return (
    <div className="p-3 w-full">
      <p className="text-3xl my-3 font-semibold">Your Notice:</p>
      <div className="grid grid-cols-3 gap-3 w-full">
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
    </div>
  );
};

export default Dashboard;
