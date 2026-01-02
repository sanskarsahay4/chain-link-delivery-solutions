import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { loginUser } from "../../api/auth.api";

export default function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("Login success:", data);

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update parent auth state
      setAuth(data.user.role);

      // Redirect immediately
      switch (data.user.role) {
        case "DRIVER":
          navigate("/driver");
          break;
        case "ADMIN":
          navigate("/admin");
          break;
        case "ORGANIZATION":
          navigate("/organization");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">🔐 Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>

      </form>
        <p className="mt-4 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
            Register here
            </Link>
        </p>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../api/auth.api";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser({ email, password });
//       console.log("Login success:", data);

//       // Save token and user info
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userRole", data.user.role);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Redirect based on role
//       switch (data.user.role) {
//         case "DRIVER":
//           navigate("/driver");
//           break;
//         case "ADMIN":
//           navigate("/admin");
//           break;
//         case "PARTNER":
//           navigate("/partner");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-2xl mb-4">🔐 Login</h2>
//       {error && <p className="text-red-600">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../api/auth.api";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser({ email, password });
//       console.log("Login success:", data);
//       // Save user info or role in localStorage or context
//       localStorage.setItem("userRole", data.role);
//       navigate("/"); // Redirect to home/dashboard
//     } catch (err) {
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-2xl mb-4">🔐 Login</h2>
//       {error && <p className="text-red-600">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// import React from "react";

// export default function Login() {
//   return <h2 className="p-4">🔐 Login Page</h2>;
// }

// import React from 'react';

// function Login() {
//   return (
//     <div>
//       <h2>Login Page</h2>
//       <p>Welcome to Chain Link Delivery Solutions</p>
//     </div>
//   );
// }

// export default Login;

// import { useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try { await login(email, password); }
//     catch (err) { alert("Login failed"); }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
