"use client";

import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globals";
import { lightTheme, darkTheme } from "../styles/themes";
import { Provider } from "react-redux";
import { store } from "../store/store";

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
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <button
          onClick={toggleTheme}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          Toggle Theme
        </button>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
