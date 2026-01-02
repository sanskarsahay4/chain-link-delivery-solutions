import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <nav>
        <Link to="/admin">Dashboard</Link> | 
        <Link to="/admin/users">Users</Link> | 
        <Link to="/admin/rides">Rides</Link> | 
        <button onClick={logout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
