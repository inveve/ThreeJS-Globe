// globalStyles.js
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: rgb(0,0,0);
    background: linear-gradient(133deg, rgba(0,0,0,1) 0%, rgba(68,60,89,1) 100%); 
    font-family: 'Source Code Pro', monospace;
  }
`

export default GlobalStyle
