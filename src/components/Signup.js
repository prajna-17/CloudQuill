import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ showAlert, darkMode }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
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
      className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Log In to CloudQuill
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter your password"
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
