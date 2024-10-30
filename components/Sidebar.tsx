"use client";

import React from "react";
import {
  AiOutlineMenu,
  AiOutlineAppstore,
  AiOutlineBell,
} from "react-icons/ai";
import { MdEventNote, MdSettings, MdHelpOutline } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between items-center rounded-lg p-3 ">
      {/* Top Section - Menu Icon */}
      <div className="flex flex-col items-center">
        {/* Menu Icon with Line */}
        <div className="flex flex-col items-center mb-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AiOutlineMenu className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200 mb-6" />
              </TooltipTrigger>
              <TooltipContent>
                <span>This feature will be activated in V2</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="block h-0.5 w-20 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
        </div>

        {/* Navigation Icons */}
        <div className="space-y-8 flex flex-col items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AiOutlineAppstore className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
              </TooltipTrigger>
              <TooltipContent>
                <span>This feature will be activated in V2</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdEventNote className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
              </TooltipTrigger>
              <TooltipContent>
                <span>This feature will be activated in V2</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AiOutlineBell className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
              </TooltipTrigger>
              <TooltipContent>
                <span>This feature will be activated in V2</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdSettings className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
              </TooltipTrigger>
              <TooltipContent>
                <span>This feature will be activated in V2</span>
              </TooltipContent>
            </Tooltip>{" "}
          </TooltipProvider>
        </div>
      </div>

      <div className="flex justify-center mb-4 absolute bottom-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MdHelpOutline className="text-gray-400 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
            </TooltipTrigger>
            <TooltipContent>
              <span>This feature will be activated in V2</span>
            </TooltipContent>
          </Tooltip>{" "}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
