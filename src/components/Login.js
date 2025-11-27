import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ showAlert, darkMode }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://cloudquill-iuwn.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showAlert("Logged in successfully", "success");
    } else {
      showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6  ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900 mt-2"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Log In to CloudQuill
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder-gray-400 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder-gray-400 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
