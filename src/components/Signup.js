import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ showAlert, darkMode }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://cloudquill-iuwn.onrender.com/api/auth/createuser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      showAlert("Account created successfully", "success");
      navigate("/login");
    } else {
      showAlert(json.error || "Invalid details", "danger");
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
        Sign Up for CloudQuill
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={credentials.name}
            placeholder="Enter your name"
            className={`w-full px-4 py-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email address</label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            minLength={5}
            placeholder="Enter your password"
            className={`w-full px-4 py-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
