import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/driver">Driver</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/partner">Partner</Link>
      <Link to="/rides">Rides</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
