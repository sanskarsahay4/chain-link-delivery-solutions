import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Pages
import Login from "../pages/auth/Login";
import DriverDashboard from "../pages/driver/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Rides from "../pages/admin/Rides";
import OrganizationDashboard from "../pages/organization/Dashboard";
import NotFound from "../pages/NotFound";

// Layouts
import DriverLayout from "../layouts/DriverLayout";
import AdminLayout from "../layouts/AdminLayout";
import OrganizationLayout from "../layouts/OrganizationLayout";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/login" />;
    if (!roles.includes(user.role)) return <Navigate to="/login" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Driver Routes */}
        <Route path="/driver" element={
          <ProtectedRoute roles={["DRIVER"]}>
            <DriverLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DriverDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="rides" element={<Rides />} />
        </Route>

        {/* Organization Routes */}
        <Route path="/organization" element={
          <ProtectedRoute roles={["ORGANIZATION"]}>
            <OrganizationLayout />
          </ProtectedRoute>
        }>
          <Route index element={<OrganizationDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
