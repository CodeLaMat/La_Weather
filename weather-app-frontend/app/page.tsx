"use client";

import React from "react";
import dynamic from "next/dynamic";
import WeatherDisplay from "../components/WeatherDisplay";
import Highlight from "../components/Highlight";
import OtherCities from "../components/OtherCities";
import Sidebar from "../components/Sidebar";
import FiveDays from "../components/FiveDays";

const WeatherMapWithNoSSR = dynamic(() => import("../components/WeatherMap"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 2xl:p-10">
      {/* Sidebar Section */}
      <div className="w-full lg:w-[10%] 2xl:w-[12%] bg-lightSidebar mb-5 lg:mb-0 rounded-lg p-5 shadow-lg h-full lg:h-auto overflow-y-auto dark:bg-darkSidebar">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full lg:w-[93%] grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 2xl:gap-6">
        {/* Weather Display */}
        <div className="rounded-lg p-5 shadow-lg  bg-lightCard dark:bg-darkCard 2xl:w-[80%] 2xl:ml-9">
          <WeatherDisplay />
        </div>

        {/* Forecast */}
        <div className="rounded-lg p-5 shadow-lg  bg-lightCard dark:bg-darkCard">
          <Highlight />
        </div>

        {/* Rain Chart */}
        <div className="rounded-lg p-5 shadow-lg  bg-lightCard dark:bg-darkCard">
          <OtherCities />
        </div>
        {/* Five days forecast */}
        <div className="rounded-lg p-5 shadow-lg  bg-lightCard dark:bg-darkCard">
          <FiveDays />
        </div>
        {/* Global Map (spans full width on large screens) */}
        <div className="rounded-lg p-5 shadow-lg col-span-1 lg:col-span-2 bg-lightCard dark:bg-darkCard">
          <WeatherMapWithNoSSR />
        </div>
      </div>
    </div>
  );
};

export default Home;
