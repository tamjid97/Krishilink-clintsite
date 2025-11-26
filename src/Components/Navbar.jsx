// Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import logo from "../assets/icons8-tree-planting-60.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 bg-green-300 shadow-sm z-50 px-4">
      <div className="navbar max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <Link to="/" className="text-2xl font-bold text-black">
            𝗞𝗿𝗶𝘀𝗵𝗶𝗟𝗶𝗻𝗸
          </Link>
        </div>

        {/* Links */}
        <ul className="hidden lg:flex gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-crops">All Crops</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="profile">My profile</Link>
              </li>
              <li>
                <Link to="/add-crops">Add Crops</Link>
              </li>
              <li>
                <Link to="/my-posts">My Posts</Link>
              </li>
              <li>
                <Link to="/my-interests">My Interests</Link>
              </li>
            </>
          )}
        </ul>

        {/* User Section */}
        <div className="relative">
          {user ? (
            <div
              className="relative flex items-center cursor-pointer"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* Profile Picture */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-700 font-bold">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 text-center z-50">
                  <p className="font-semibold text-gray-700 mb-2">
                    {user.displayName || user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn border-none bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn border-none bg-green-500 text-white hover:bg-green-700 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
