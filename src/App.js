import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const tasks = useSelector((state) => state.tasks.value);
  console.log(tasks.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            tasks.isAuthenticated ? <Home /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="login"
          element={
            tasks.isAuthenticated ? <Navigate replace to="/" /> : <Login />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
