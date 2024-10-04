"use client";

import React, { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navigation from "@/components/Navigation";
import GlobalLoading from "@/components/GlobalLoading";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

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
    <SessionProvider>
      <Provider store={store}>
        <div
          id="app-top-navigation"
          className="flex flex-row justify-between p-4  bg-darkBackground dark:bg-darkBody"
        >
          <Navigation toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        </div>
        <GlobalLoading />
        {children}
      </Provider>
    </SessionProvider>
  );
}
