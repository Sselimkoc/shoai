import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div
      className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-orange-400 to-yellow-400
shadow-lg rounded-lg h-32"
    >
      {/* Logo */}
      <div className="flex items-center gap-6">
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="text-white text-3xl font-extrabold">
          AI Video Generator
        </h1>
      </div>

      {/* User Button */}
      <div className="flex items-center">
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
