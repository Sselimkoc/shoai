import React from "react";
import Header from "./_components/header";
import { LayoutDashboard } from "lucide-react";
export default function Dashboard() {
  const MenuItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "Create New",
      path: "create-new",
      icon: LayoutDashboard,
    },
    {
      id: 3,
      name: "Account",
      path: "Account",
      icon: LayoutDashboard,
    },
  ];
  return (
    <>
      <Header />
      <div className="flex justify-center gap-5 bg-cyan-300 ">
        {MenuItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center align-middle  menu-item"
          >
            <item.icon />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
