import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './pages/Login';
import BuySellDashboard from './pages/BuySellDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import CreateLoad from './pages/CreateLoad';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Notifications from "./pages/Notification";

function getRole() {
  const t = localStorage.getItem('token');
  if (!t) return null;
  return JSON.parse(atob(t.split('.')[1])).role;
}

export default function App() {
  const token = localStorage.getItem('token');
  const role = getRole();

  return (
    <BrowserRouter>

      {!token ? (
        <Login />
      ) : (
        <div className="d-flex">

          <Sidebar role={role} />

          <div className="flex-grow-1">
            <Navbar />

            <div className="p-3">
              <Routes>

                {/* Default Route */}
                <Route
                  path="/"
                  element={
                    role === "BUYSELL"
                      ? <BuySellDashboard />
                      : <TransporterDashboard />
                  }
                />

                {/* Create Load Page */}
                <Route path="/create-load" element={<CreateLoad />} />

                {/* Role-based routes */}
                {role === "BUYSELL" && (
                  <Route path="/my-loads" element={<BuySellDashboard />} />
                )}

                {role === "TRANSPORTER" && (
                  <>
                    <Route path="/available-loads" element={<TransporterDashboard />} />
                    <Route path="/notifications" element={<Notifications />} />
                  </>
                )}

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />

              </Routes>
            </div>
          </div>

        </div>
      )}

    </BrowserRouter>
  );
}