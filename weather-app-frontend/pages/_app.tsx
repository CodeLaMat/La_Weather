import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globals";
import { lightTheme, darkTheme } from "../styles/themes";
import { useState } from "react";
import { store } from "../../store/store";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
