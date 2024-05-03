import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import React, { Suspense, useState } from "react";
import CommonLoader from "./common/components/CommonLoader/CommonLoader";
import { isLoggedIn } from "./utils/cookie-utils";
import Login from "./components/Login/Login";
import Header from "./common/components/Header/Header";
import NavBar from "./common/components/NavBar/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import GameCenter from "./components/GameCenter/GameCenter";

function App() {
  return (
    <>
      {!isLoggedIn() ? <Header /> : null}
      <Suspense fallback={<CommonLoader />}>
        <Router>
          <Routes>
            <Route
              path="/"
              Component={(props) =>
                !isLoggedIn() ? (
                  <Login />
                ) : (
                  <Navigate
                    to="/app/dashboard"
                    replace={true}
                    state={{
                      roload: true,
                    }}
                  />
                )
              }
            />
            <Route
              path="/app/dashboard"
              Component={(props) =>
                !isLoggedIn() ? (
                  <Dashboard />
                ) : (
                  <Navigate
                    to="/"
                    replace={true}
                    state={{
                      roload: true,
                    }}
                  />
                )
              }
            />
            <Route
              path="/app/game-center"
              Component={(props) =>
                !isLoggedIn() ? (
                  <GameCenter />
                ) : (
                  <Navigate
                    to="/"
                    replace={true}
                    state={{
                      roload: true,
                    }}
                  />
                )
              }
            />
          </Routes>
        </Router>
      </Suspense>
      {!isLoggedIn() ? <NavBar /> : null}
    </>
  );
}

export default App;
