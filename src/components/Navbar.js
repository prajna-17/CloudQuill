import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className={`flex justify-between items-center px-6 py-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } shadow-md`}
    >
      <Link to="/" className="font-bold text-xl">
        CloudQuill
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          className={`${location.pathname === "/" ? "underline" : ""}`}
          to="/"
        >
          Home
        </Link>

        {!localStorage.getItem("token") ? (
          <>
            <Link
              className="btn bg-blue-500 hover:bg-gray-200 text-white px-4 py-1 rounded"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn bg-green-500 hover:bg-gray-200 text-white px-4 py-1 rounded"
              to="/signup"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            className="btn bg-red-500 hover:bg-gray-200 text-white px-4 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 p-2 rounded-full border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "Light-Mode" : "Dark-Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
