
import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-100 to-green-300 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404 Illustration"
        className="w-40 mb-6 animate-bounce"
      />

      <h1 className="text-7xl font-extrabold text-green-800 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Oops! Page Not Found 🌾
      </h2>
      <p className="text-gray-700 mb-8 max-w-md">
        Looks like the page you’re trying to visit doesn’t exist.  
        Maybe you took a wrong turn in the field!
      </p>

      <Link
        to="/"
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error404;
