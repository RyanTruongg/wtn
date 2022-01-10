import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import { ProvideAuth } from "hooks/use-auth";
import { renderRoutes } from "react-router-config";

import theme from "./theme";
import routes from "./routes";
import { ScrollReset } from "./components";

const history = createBrowserHistory();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <Router history={history}>
          <ScrollReset />
          {renderRoutes(routes)}
        </Router>
      </ProvideAuth>
    </ThemeProvider>
  );
};

export default App;
