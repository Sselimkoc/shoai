import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <>
      <div className="flex justify-between ">
        <div>logo</div>
        <h2>Content</h2>
        <UserButton></UserButton>
      </div>
    </>
  );
}

export default Header;
