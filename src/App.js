import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import NoUser from "./pages/NoUser";

import Show from "./pages/Show";
import Home from "./pages/home.js";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/forgotPassword";
import ProfilePage from "./pages/profilePage";
import ArticlesPage from "./pages/ArticlesPage";
import ViewArticle from "./pages/ViewArticle";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./context/userAuthContext";

import PrivateRoute from "./privateRouts/privateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes without navbar */}
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/no-user" element={<NoUser />} />
          <Route path="/user/forgot-password" element={<ForgotPassword />} />

          {/* Routes with the navbar */}
          <Route
            path="/user/profile/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Show />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:id" element={<ViewArticle />} />
          <Route path="/admin/:id" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
