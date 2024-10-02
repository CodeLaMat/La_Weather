"use client";

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navigation from "@/components/Navigation";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Apply the dark mode class to the HTML element
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Provider store={store}>
      <div
        id="app-top-navigation"
        className="flex flex-row justify-between p-4  bg-darkBackground dark:bg-darkBody"
      >
        <Navigation toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      </div>
      {children}
    </Provider>
  );
}
