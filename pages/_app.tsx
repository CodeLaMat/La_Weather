import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globals";
import { lightTheme, darkTheme } from "../styles/themes";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
