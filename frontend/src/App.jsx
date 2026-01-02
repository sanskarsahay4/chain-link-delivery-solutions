import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages / Dashboards
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DriverDashboard from "./pages/driver/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import OrganizationDashboard from "./pages/organization/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Load auth info from localStorage
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
        setIsAuthenticated(true);
        setUserRole(role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUserRole(null);
    };

    // function to update auth state from Login page
    const setAuth = (role) => {
        setUserRole(role);
        setIsAuthenticated(true);
    };

    return (
        <Router>
        <div className="App p-4">
            <h1 className="text-3xl mb-4">🚚 Chain Link Delivery Solutions</h1>

            {isAuthenticated && (
            <div className="mb-4">
                <p>
                Logged in as <strong>{userRole}</strong>{" "}
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white p-1 rounded ml-2"
                >
                    Logout
                </button>
                </p>
            </div>
            )}

            <Routes>
            {/* Redirect root based on auth */}
            <Route
                path="/"
                element={
                isAuthenticated ? (
                    userRole === "DRIVER" ? (
                    <Navigate to="/driver" />
                    ) : userRole === "ADMIN" ? (
                    <Navigate to="/admin" />
                    ) : userRole === "ORGANIZATION" ? (
                    <Navigate to="/organization" />
                    ) : null
                ) : (
                    <Navigate to="/login" />
                )
                }
            />

            {/* Authentication */}
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboards */}
            <Route
                path="/driver"
                element={
                isAuthenticated && userRole === "DRIVER" ? (
                    <DriverDashboard />
                ) : (
                    <Navigate to="/login" />
                )
                }
            />
            <Route
                path="/admin"
                element={
                isAuthenticated && userRole === "ADMIN" ? (
                    <AdminDashboard />
                ) : (
                    <Navigate to="/login" />
                )
                }
            />
            <Route
                path="/organization"
                element={
                isAuthenticated && userRole === "ORGANIZATION" ? (
                    <OrganizationDashboard />
                ) : (
                    <Navigate to="/login" />
                )
                }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
        </Router>
    );
}

export default App;
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Pages / Dashboards
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import DriverDashboard from "./pages/driver/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard";
// import PartnerDashboard from "./pages/partner/Dashboard";
// import NotFound from "./pages/NotFound";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   // Load auth info from localStorage
//   useEffect(() => {
//     const role = localStorage.getItem("userRole");
//     if (role) {
//       setIsAuthenticated(true);
//       setUserRole(role);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsAuthenticated(false);
//     setUserRole(null);
//   };

//   return (
//     <Router>
//       <div className="App p-4">
//         <h1 className="text-3xl mb-4">🚚 Chain Link Delivery Solutions</h1>

//         {isAuthenticated && (
//           <div className="mb-4">
//             <p>
//               Logged in as <strong>{userRole}</strong>{" "}
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white p-1 rounded ml-2"
//               >
//                 Logout
//               </button>
//             </p>
//           </div>
//         )}

//         <Routes>
//           {/* Redirect root based on auth */}
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 userRole === "DRIVER" ? (
//                   <Navigate to="/driver" />
//                 ) : userRole === "ADMIN" ? (
//                   <Navigate to="/admin" />
//                 ) : userRole === "PARTNER" ? (
//                   <Navigate to="/partner" />
//                 ) : null
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* Authentication */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Dashboards */}
//           <Route
//             path="/driver"
//             element={
//               isAuthenticated && userRole === "DRIVER" ? (
//                 <DriverDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               isAuthenticated && userRole === "ADMIN" ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/partner"
//             element={
//               isAuthenticated && userRole === "PARTNER" ? (
//                 <PartnerDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* 404 */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Pages / Dashboards
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import DriverDashboard from "./pages/driver/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard";
// import PartnerDashboard from "./pages/partner/Dashboard";
// import NotFound from "./pages/NotFound";

// function App() {
//   // Authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null); // DRIVER / ADMIN / PARTNER

//   // Load auth info from localStorage (or context)
//   useEffect(() => {
//     const role = localStorage.getItem("userRole");
//     if (role) {
//       setIsAuthenticated(true);
//       setUserRole(role);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("userRole");
//     setIsAuthenticated(false);
//     setUserRole(null);
//   };

//   return (
//     <Router>
//       <div className="App p-4">
//         <h1 className="text-3xl mb-4">🚚 Chain Link Delivery Solutions</h1>

//         {isAuthenticated && (
//           <div className="mb-4">
//             <p>
//               Logged in as <strong>{userRole}</strong>{" "}
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white p-1 rounded ml-2"
//               >
//                 Logout
//               </button>
//             </p>
//           </div>
//         )}

//         <Routes>
//           {/* Redirect root based on auth */}
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 userRole === "DRIVER" ? (
//                   <Navigate to="/driver" />
//                 ) : userRole === "ADMIN" ? (
//                   <Navigate to="/admin" />
//                 ) : userRole === "PARTNER" ? (
//                   <Navigate to="/partner" />
//                 ) : null
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* Authentication */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Dashboards */}
//           <Route
//             path="/driver"
//             element={
//               isAuthenticated && userRole === "DRIVER" ? (
//                 <DriverDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               isAuthenticated && userRole === "ADMIN" ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/partner"
//             element={
//               isAuthenticated && userRole === "PARTNER" ? (
//                 <PartnerDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* 404 */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import DriverDashboard from "./pages/driver/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard";
// import PartnerDashboard from "./pages/partner/Dashboard";
// import RideList from "./pages/rides/RideList";
// import NotFound from "./pages/NotFound";

// function App() {
//   // Authentication state placeholder
//   const isAuthenticated = false;
//   const userRole = null; // DRIVER, ADMIN, PARTNER

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 text-gray-800">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/driver"
//             element={
//               isAuthenticated && userRole === "DRIVER" ? (
//                 <DriverDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               isAuthenticated && userRole === "ADMIN" ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/partner"
//             element={
//               isAuthenticated && userRole === "PARTNER" ? (
//                 <PartnerDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route path="/rides" element={<RideList />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// export default function App() {
//   return (
//     <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
//       <h1 className="text-5xl font-bold text-blue-600">
//         Tailwind is working!
//       </h1>
//     </div>
//   );
// }

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


// function RideList() {
//   return <h2>🚗 Ride List Page</h2>;
// }
// function DriverDashboard() {
//   return <h2>🧑‍✈️ Driver Dashboard</h2>;
// }
// function AdminDashboard() {
//   return <h2>👨‍💼 Admin Dashboard</h2>;
// }
// function PartnerDashboard() {
//   return <h2>🤝 Partner Dashboard</h2>;
// }
// function Login() {
//   return <h2>🔐 Login Page</h2>;
// }
// function Register() {
//   return <h2>📝 Register Page</h2>;
// }
// function NotFound() {
//   return <h2>❌ 404 Not Found</h2>;
// }

// function App() {
//   return (
//     <Router>
//       <div>
//         <h1>Chain Link Delivery Solutions</h1>
//         <nav>
//           <Link to="/">Rides</Link> |{" "}
//           <Link to="/driver">Driver</Link> |{" "}
//           <Link to="/admin">Admin</Link> |{" "}
//           <Link to="/partner">Partner</Link> |{" "}
//           <Link to="/login">Login</Link> |{" "}
//           <Link to="/register">Register</Link>
//         </nav>

//         <Routes>
//           <Route path="/" element={<RideList />} />
//           <Route path="/driver" element={<DriverDashboard />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/partner" element={<PartnerDashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// // ✅ Pages
// import RideList from "./components/RideList";
// import DriverDashboard from "./pages/driver/Dashboard";
// import AdminDashboard from "./pages/admin/Dashboard";
// // import PartnerDashboard from "./pages/partner/Dashboard";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import NotFound from "./pages/NotFound";

// function App() {
//   const isAuthenticated = false; // later from context or redux
//   const userRole = null; // DRIVER / ADMIN / PARTNER

//   return (
//     <Router>
//       <div className="App">
//         <h1>Chain Link Delivery Solutions</h1>

//         {/* Simple navigation for testing */}
//         <nav style={{ marginBottom: "20px" }}>
//           <Link to="/">Home</Link> |{" "}
//           <Link to="/rides">Rides</Link> |{" "}
//           <Link to="/driver">Driver</Link> |{" "}
//           <Link to="/admin">Admin</Link> |{" "}
//           <Link to="/partner">Partner</Link> |{" "}
//           <Link to="/login">Login</Link> |{" "}
//           <Link to="/register">Register</Link>
//         </nav>

//         <Routes>
//           {/* Home route */}
//           <Route path="/" element={<RideList />} />

//           {/* Auth routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Dashboards */}
//           <Route
//             path="/driver"
//             element={
//               isAuthenticated && userRole === "DRIVER" ? (
//                 <DriverDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               isAuthenticated && userRole === "ADMIN" ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/partner"
//             element={
//               isAuthenticated && userRole === "PARTNER" ? (
//                 <PartnerDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* Rides list (visible to all for now) */}
//           <Route path="/rides" element={<RideList />} />

//           {/* 404 Fallback */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// function Home() {
//   return <h2>🏠 Home Page</h2>;
// }

// function Login() {
//   return <h2>🔐 Login Page</h2>;
// }

// function App() {
//   return (
//     <Router>
//       <div>
//         <h1>Chain Link Delivery Solutions</h1>
//         <nav>
//           <Link to="/">Home</Link> |{" "}
//           <Link to="/login">Login</Link>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import RideList from './components/RideList';
// import DriverDashboard from './pages/driver/Dashboard';
// import AdminDashboard from './pages/admin/Dashboard';
// // import PartnerDashboard from './components/PartnerDashboard';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import NotFound from './pages/NotFound';

// function App() {
//   // You can implement authentication state here later
//   const isAuthenticated = false; // Placeholder
//   const userRole = null; // DRIVER / ADMIN / PARTNER

//   return (
//     <Router>
//       <div className="App">
//         <h1>Chain Link Delivery Solutions</h1>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* Authentication */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Dashboards */}
//           <Route
//             path="/driver"
//             element={
//               isAuthenticated && userRole === 'DRIVER' ? (
//                 <DriverDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               isAuthenticated && userRole === 'ADMIN' ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/partner"
//             element={
//               isAuthenticated && userRole === 'PARTNER' ? (
//                 <PartnerDashboard />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* Ride List (could be for all roles depending on permissions) */}
//           <Route path="/rides" element={<RideList />} />

//           {/* 404 */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
