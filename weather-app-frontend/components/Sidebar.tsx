"use client";

import React from "react";
import {
  AiOutlineMenu,
  AiOutlineAppstore,
  AiOutlineBell,
} from "react-icons/ai";
import { MdEventNote, MdSettings, MdHelpOutline } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between items-center  bg-darkSidebar rounded-lg p-3 ">
      {/* Top Section - Menu Icon */}
      <div className="flex flex-col items-center">
        {/* Menu Icon with Line */}
        <div className="flex flex-col items-center mb-8">
          <AiOutlineMenu className="text-white w-8 h-8 cursor-pointer mb-6" />
          <span className="block h-0.5 w-20 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
        </div>

        {/* Navigation Icons */}
        <div className="space-y-8 flex flex-col items-center">
          <AiOutlineAppstore className="text-white w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
          <MdEventNote className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
          <AiOutlineBell className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
          <MdSettings className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
        </div>
      </div>

      <div className="flex justify-center mb-4 absolute bottom-0">
        <MdHelpOutline className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
      </div>
    </div>
  );
};

export default Sidebar;
