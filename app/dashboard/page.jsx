"use client";
import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to AI Video Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Create amazing videos with the power of AI. Get started by creating
          your first video project.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard/create-new"
            className="btn-primary inline-block"
          >
            Create New Video
          </Link>
        </div>
      </div>
    </div>
  );
}
