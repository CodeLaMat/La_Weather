"use client";

import React from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import Forecast from "../components/Forecast";
import RainChart from "../components/RainChart";
import GlobalMap from "../components/GlobalMap";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen p-4">
      <div className="w-[7%] rounded-lg p-5 shadow-lg h-full overflow-y-auto bg-lightSidebar dark:bg-darkSidebar">
        <Sidebar />
      </div>
      <div className="w-[93%] grid grid-cols-2 gap-5 p-5">
        <div className="rounded-lg p-5 shadow-lg h-72 bg-lightCard dark:bg-darkCard">
          <WeatherDisplay />
        </div>
        <div className="rounded-lg p-5 shadow-lg h-86 bg-lightCard dark:bg-darkCard">
          <Forecast />
        </div>
        <div className="rounded-lg p-5 shadow-lg h-72 bg-lightCard dark:bg-darkCard">
          <RainChart />
        </div>
        <div className="rounded-lg p-5 shadow-lg h-96 col-span-2 bg-lightCard dark:bg-darkCard">
          <GlobalMap />
        </div>
      </div>
    </div>
  );
};

export default Home;
