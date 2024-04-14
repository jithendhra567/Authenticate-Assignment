import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Authenticator from "./components/Authenticator";
import { AuthProvider } from "./hooks/useAuth";
import { ROUTES } from "./utils/constants";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import Snackbar from "./elements/Snackbar";

function App(): JSX.Element {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path={ROUTES.ROOT} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route
              path={ROUTES.HOME}
              element={
                <Authenticator>
                  <Home />
                </Authenticator>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div id="portal" />
        <Snackbar />
      </AuthProvider>
    </Router>
  );
}

export default App;
