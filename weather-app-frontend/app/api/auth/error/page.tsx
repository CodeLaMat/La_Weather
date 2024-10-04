"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
      <p className="text-xl text-red-500">Error: {error}</p>
      <p className="mt-4">
        Please try logging in again or contact support if the issue persists.
      </p>
    </div>
  );
}
