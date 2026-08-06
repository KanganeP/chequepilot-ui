import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/dashboard/Layout";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import UploadChequePage from "./pages/cheque/UploadCheque";
import CreateUserPage from "./pages/user/CreateUser";
import UsersTable from "./pages/user/UsersTable";
import ChequeList from "./pages/cheque/ChequeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* Dashboard */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Future Modules */}
          <Route
            path="/upload-cheques"
            element={<UploadChequePage />}
          />
          <Route
            path="/users"
            element={<UsersTable />}
          />
          <Route
            path="/users/create"
            element={<CreateUserPage />}
          />

          <Route
            path="/cheques/list"
            element={<ChequeList />}
          />
        </Route>

        <Route
          path="/security-cheques"
          element={<h1>Security Cheques Page</h1>}
        />

        <Route
          path="/parties"
          element={<h1>Parties Page</h1>}
        />

        <Route
          path="/transactions"
          element={<h1>Transactions Page</h1>}
        />

        <Route
          path="/reports"
          element={<h1>Reports Page</h1>}
        />

        <Route
          path="/notifications"
          element={<h1>Notifications Page</h1>}
        />

        <Route
          path="/users"
          element={<h1>Users Page</h1>}
        />

        <Route
          path="/settings"
          element={<h1>Settings Page</h1>}
        />

        <Route
          path="/activity-log"
          element={<h1>Activity Log Page</h1>}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;