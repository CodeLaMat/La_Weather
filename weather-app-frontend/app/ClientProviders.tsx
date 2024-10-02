"use client";

import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/globals";
import { lightTheme, darkTheme } from "@/styles/themes";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navigation from "@/components/Navigation";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <Provider store={store}>
      {" "}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div
          id="app-top-navigation"
          className="flex flex-row justify-between p-4"
        >
          <Navigation
            toggleTheme={toggleTheme}
            isDarkTheme={theme === darkTheme}
          />
        </div>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
