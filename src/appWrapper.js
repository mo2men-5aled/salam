import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoUser from "./pages/NoUser";

import Show from "./pages/Show";
import Home from "./pages/home.js";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/forgotPassword";
import ProfilePage from "./pages/profilePage";
import ArticlesPage from "./pages/ArticlesPage";
import ViewArticle from "./pages/ViewArticle";
import AdminPage from "./pages/AdminPage";

import PrivateRoute from "./privateRouts/privateRoute";
import RegisterUser from "./pages/RegisterPage";

function AppWrapper() {
  const [triggerAction, setTriggerAction] = useState(false);
  const [language, setLanguage] = useState("en");
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without navbar */}
        <Route path="/user/login" element={<LoginPage language={language} />} />
        <Route
          path="/user/register"
          element={<RegisterUser language={language} />}
        />
        <Route path="/no-user" element={<NoUser />} />
        <Route
          path="/user/forgot-password"
          element={<ForgotPassword language={language} />}
        />
        {/* Routes with the navbar */}
        <Route
          path="/user/profile/:id"
          element={
            <PrivateRoute>
              <ProfilePage
                language={language}
                setLanguage={setLanguage}
                triggerAction={triggerAction}
                setTriggerAction={setTriggerAction}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <Home
              language={language}
              setLanguage={setLanguage}
              triggerAction={triggerAction}
              setTriggerAction={setTriggerAction}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <Show
              language={language}
              setLanguage={setLanguage}
              triggerAction={triggerAction}
              setTriggerAction={setTriggerAction}
            />
          }
        />
        q
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article/:id" element={<ViewArticle />} />
        <Route path="/admin/:id" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
