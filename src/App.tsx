import { QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Theme from "./components/ThemeProvide";
import { Router } from "./routes/Routes";
import GlobalStyle from "./styles/globalStyles";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
        <GlobalStyle />
      </BrowserRouter>
    </>
  );
}

export default App;
