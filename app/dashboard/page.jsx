import React from "react";
import Header from "./_components/Header";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

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
      path: "/create-new",
      icon: LayoutDashboard,
    },
    {
      id: 3,
      name: "Account",
      path: "/account",
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Responsive Kart */}
      <div className="bg-white shadow-2xl rounded-xl p-12 w-full max-w-4xl min-h-[800px] text-center flex flex-col justify-between">
        {/* Header */}
        <Header />
        {/* Menü Elemanları */}
        <div className="flex justify-center gap-12 mt-12  flex-wrap">
          {MenuItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div className="flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer hover:!bg-slate-500 transition-all duration-300">
                <item.icon size={48} className="text-blue-500" />
                <h2 className="mt-4 text-xl text-gray-800 font-semibold">
                  {item.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500">
          <p>© 2024 AI Video Generator - All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
