"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import { LayoutDashboard, FilePlus, User } from "lucide-react";
import CreateNew from "./create-new/page";
export default function Dashboard() {
  const [activeScreen, setActiveScreen] = useState(null);

  const MenuItems = [
    {
      id: 1,
      name: "Dashboard",
      component: <DashboardScreen />,
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "Create New",
      component: <CreateNew />,
      icon: FilePlus,
    },
    {
      id: 3,
      name: "Account",
      component: <AccountScreen />,
      icon: User,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-orange-400 to-yellow-500 text-white relative">
      {/* Navbar */}
      {activeScreen && (
        <nav className="w-full bg-white text-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-10">
          <Header />
          <div className="flex gap-4">
            {MenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.name)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  activeScreen === item.name
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 hover:bg-orange-300"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Ana Kart */}
      <div
        className={`bg-white rounded-3xl shadow-2xl transition-all duration-700 ${
          activeScreen ? "mt-16 min-h-[600px] p-6" : "mt-32 min-h-[800px] p-12"
        } w-[90%] max-w-4xl flex flex-col justify-center items-center mx-auto`}
      >
        {/* Menü Alanı */}
        {!activeScreen && (
          <>
            {/* Header: Büyütülmüş ve Ortalanmış */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">
                Welcome to ShoAI
              </h1>
              <p className="text-lg text-gray-500 mt-2">
                Select an option below to get started
              </p>
            </div>

            {/* Menü Alanı: Ekranın Ortasında */}
            <div className="flex justify-center gap-8 flex-wrap items-center">
              {MenuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-800 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 p-6 w-[150px] h-[170px]"
                  onClick={() => setActiveScreen(item.name)}
                >
                  <item.icon size={50} />
                  <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                </div>
              ))}
            </div>
          </>
        )}

        {/* İçerik Alanı */}
        {activeScreen && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-3xl font-bold mb-6 text-orange-600">
              {MenuItems.find((item) => item.name === activeScreen)?.name}
            </h1>
            <div className="w-full flex items-center justify-center">
              {MenuItems.find((item) => item.name === activeScreen)?.component}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full text-center text-sm text-gray-700 bg-white py-4 shadow-md">
        © 2024 ShoAI Video Generator - All rights reserved.
      </footer>
    </div>
  );
}

// Ekran Bileşenleri
function DashboardScreen() {
  return (
    <div className="text-gray-700 bg-orange-100 rounded-xl p-4 shadow-md">
      Welcome to the Dashboard! 🎉
    </div>
  );
}

function AccountScreen() {
  return (
    <div className="text-gray-700 bg-orange-100 rounded-xl p-4 shadow-md">
      Manage your account settings here! ⚙️
    </div>
  );
}
