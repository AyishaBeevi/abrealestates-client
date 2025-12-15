import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import Listings from "./pages/Listings.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/dashboards/AdminDashboard.jsx";
import AgentDashboard from "./pages/dashboards/AgentDashboard.jsx";
import AdminEnquiries from "./pages/dashboards/AdminEnquiries.jsx";
import AgentEnquiries from "./pages/dashboards/AgentEnquiries.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import "./utils/fixLeafletIcon.js";

export default function App() {
  const { user } = useAuth();

  /* ---------------- Protected Route ---------------- */
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (roles && !roles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  /* ---------------- Layout ---------------- */
  const AppLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );

  return (
    <>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
          },
        }}
      />

      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* -------- AGENT -------- */}
          <Route
            path="/dashboard/agent"
            element={
              <ProtectedRoute roles={["agent"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/agent/enquiries"
            element={
              <ProtectedRoute roles={["agent"]}>
                <AgentEnquiries />
              </ProtectedRoute>
            }
          />

          {/* -------- ADMIN -------- */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/enquiries"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminEnquiries />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </>
  );
}
