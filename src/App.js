import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import NoData from "./components/NoData";

import Show from "./components/Show";
import Home from "./pages/home.js";
import Navbar from "./components/navbar";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/forgotPassword";
import ProfilePage from "./pages/profilePage";
import { AuthProvider } from "./context/userAuthContext";

import PrivateRoute from "./privateRouts/privateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/user/profile/:id"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<LoginPage />} />
            <Route path="/user/forgot-password" element={<ForgotPassword />} />
            <Route path="/:id" element={<Show />} />
            <Route path="/NoData" element={<NoData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
