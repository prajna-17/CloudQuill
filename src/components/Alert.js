import React from "react";

function Alert({ alert }) {
  const capitalize = (word) => {
    if (!word) return "";
    if (word === "danger") word = "Error";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="h-12">
      {alert && (
        <div
          className={`px-4 py-2 rounded shadow-md transition ${
            alert.type === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          <strong>{capitalize(alert.type)}:</strong> {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
