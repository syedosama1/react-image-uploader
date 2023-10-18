import React from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Routes, Route, Outlet } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<Login />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route
              path="/home"
              element={
                <Home>
                  <Outlet /> {/* This renders nested routes */}
                </Home>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
