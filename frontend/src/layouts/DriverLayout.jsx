import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DriverLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <nav>
        <Link to="/driver">Dashboard</Link> | 
        <button onClick={logout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DriverLayout;
