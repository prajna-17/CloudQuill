import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <div
            className={`min-h-screen transition-colors duration-300 ${
              darkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            {/* Navbar */}
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Alerts */}
            <Alert alert={alert} />

            {/* Page container */}
            <main className="max-w-6xl mx-auto px-4 py-6">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home showAlert={showAlert} darkMode={darkMode} />}
                />
                <Route
                  path="/login"
                  element={<Login showAlert={showAlert} />}
                />
                <Route
                  path="/signup"
                  element={<Signup showAlert={showAlert} />}
                />
              </Routes>
            </main>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
