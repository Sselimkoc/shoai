import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <>
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
    </>
  );
}

export default Header;
