import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: ${(props) =>
      props.theme.body}; // Use theme for background color
    color: ${(props) => props.theme.text}; // Use theme for text color
  }
`;

export default GlobalStyle;
