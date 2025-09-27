import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              AI Video Generator
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard/create-new" className="btn-primary">
              Create New
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
