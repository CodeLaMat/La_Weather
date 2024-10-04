"use client";

import React from "react";
import { AiOutlineCloud } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="relative">
          <AiOutlineCloud className="animate-spin text-6xl text-blue-500 dark:text-white mx-auto" />
          <div className="absolute top-10 left-0 right-0 flex justify-center gap-2">
            <div className="w-2 h-5 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-5 bg-blue-300 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-800 dark:text-gray-100">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
