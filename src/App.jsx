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
import { useAuth } from "./context/AuthContext.jsx";
import "./utils/fixLeafletIcon.js";
import AdminEnquiries from "./pages/dashboards/AdminEnquiries.jsx";
import AgentEnquiries from "./pages/dashboards/AgentEnquiries.jsx";

export default function App() {
  const { user } = useAuth();

  // Protected route wrapper
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
    return children;
  };

  // Layout wrapper for Header/Footer
  const AppLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/properties/:slug" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/dashboard/agent/enquiries" element={<AgentEnquiries />} />
<Route path="/dashboard/admin/enquiries" element={<AdminEnquiries />} />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agent"
          element={
            <ProtectedRoute roles={["agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
}
