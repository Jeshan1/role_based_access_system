import {
  Book,
  LayoutDashboard,
  Notebook,
  OutdentIcon,
  User,
} from "lucide-react";

export const sideBarList = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    access: ["admin", "patient", "doctor", "staff"],
    path: "/dashboard",
  },
  {
    name: "Users",
    icon: <User />,
    access: ["admin", "doctor", "staff"],
    path: "/dashboard/userlist",
  },
  {
    name: "Publish Notice",
    icon: <Notebook />,
    access: ["admin"],
    path: "/dashboard/addnotice",
  },
  {
    name: "All Notice",
    icon: <Book />,
    access: ["admin", "staff"],
    path: "/dashboard/allnotice",
  },
];
