import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

interface NoticeState {
  title: string;
  notice: string;
  access: string[]; // Array of roles who can access the notice
}

const AddNotice = () => {
  const [notice, setNotice] = useState<NoticeState>({
    title: "",
    notice: "",
    access: [],
  });

  // Handler for text inputs
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotice((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handler for checkboxes
  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setNotice((prev) => ({
      ...prev,
      access: checked
        ? [...prev.access, value]
        : prev.access.filter((role) => role !== value),
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:4000/api/notice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: notice.title,
        notice: notice.notice,
        access: notice.access,
      }),
    });
    const data = await responce.json();
    console.log(data);
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-[10%]">
      <form onSubmit={submitHandler}>
        <Input
          inputProps={{
            placeholder: "Enter your Notice Title Here",
            type: "text",
            name: "title",
            value: notice.title,
            onChange: changeHandler,
          }}
          label="Notice Title"
        />

        <Input
          inputProps={{
            placeholder: "Enter your Notice Here",
            type: "text",
            name: "notice",
            value: notice.notice,
            onChange: changeHandler,
          }}
          label="Notice"
        />

        <label className="font-semibold my-3 block">Publish For</label>
        <div className="flex flex-col gap-y-2">
          {["doctor", "staff", "patient", "admin"].map((role) => (
            <div className="flex gap-x-2 items-center" key={role}>
              <input
                value={role}
                type="checkbox"
                checked={notice.access.includes(role)}
                onChange={checkboxHandler}
              />
              <p>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
            </div>
          ))}
        </div>

        <Button>Publish</Button>
      </form>
    </div>
  );
};

export default AddNotice;
