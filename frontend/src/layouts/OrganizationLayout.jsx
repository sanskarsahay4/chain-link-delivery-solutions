import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const OrganizationLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <nav>
        <Link to="/organization">Dashboard</Link> | 
        <button onClick={logout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizationLayout;
