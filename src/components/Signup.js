import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ showAlert, darkMode }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showAlert("Account Created Successfully", "success");
    } else {
      showAlert("Invalid Details", "danger");
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
        Create an account to use CloudQuill
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChange}
            placeholder="Enter your name"
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
            required
          />
          <div
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            We'll never share your email with anyone else.
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            minLength={5}
            required
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label htmlFor="cpassword" className="block mb-1 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            placeholder="Confirm your password"
            minLength={5}
            required
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
