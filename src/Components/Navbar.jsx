// Navbar.jsx
import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import logo from "../assets/icons8-tree-planting-60.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // ACTIVE LINK STYLE
  const active =
    "border-b-2 border-green-700 text-green-700 pb-1 font-semibold";

  const normal = "hover:text-green-700";

  // MOBILE AUTO CLOSE
  const closeMobile = () => setMobileMenu(false);

  return (
    <nav className="sticky top-0 bg-green-300 shadow-sm z-50">
      {/* ------------------ DESKTOP NAV ------------------ */}
      <div className="hidden lg:flex navbar max-w-7xl mx-auto justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <Link to="/" className="text-2xl font-bold text-black">
            𝗞𝗿𝗶𝘀𝗵𝗶𝗟𝗶𝗻𝗸
          </Link>
        </div>

        <ul className="flex gap-6">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? active : normal)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="all-crops"
              className={({ isActive }) => (isActive ? active : normal)}
            >
              All Crops
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  My profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="AddCrops"
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  Add Crops
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="Mypost"
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  My Posts
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="MyInterest"
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  My Interests
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="relative">
          {user ? (
            <div
              className="relative flex items-center cursor-pointer"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img src={user.photoURL} className="w-full h-full object-cover" />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 text-center">
                  <p className="font-semibold mb-2">{user.displayName || user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn bg-green-600 text-white">Login</Link>
              <Link to="/register" className="btn bg-green-500 text-white">Register</Link>
            </div>
          )}
        </div>
      </div>

      {/* ------------------ MOBILE NAV ------------------ */}
      <div className="lg:hidden px-4 py-3 flex justify-between items-center">
        {/* LEFT — Dropdown Button */}
        <button onClick={() => setMobileMenu(!mobileMenu)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* CENTER — LOGO */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-10 h-10" />
          <Link to="/" className="text-xl font-bold">𝗞𝗿𝗶𝘀𝗵𝗶𝗟𝗶𝗻𝗸</Link>
        </div>

        {/* RIGHT — Profile */}
        {user ? (
          <Link to="/profile">
            <img
              src={user.photoURL}
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <ul className="lg:hidden bg-white shadow-md px-4 py-3 space-y-2">

          <li>
            <NavLink
              to="/"
              onClick={closeMobile}
              className={({ isActive }) => (isActive ? active : normal)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="all-crops"
              onClick={closeMobile}
              className={({ isActive }) => (isActive ? active : normal)}
            >
              All Crops
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/profile"
                  onClick={closeMobile}
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  My profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="AddCrops"
                  onClick={closeMobile}
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  Add Crops
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="Mypost"
                  onClick={closeMobile}
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  My Posts
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="MyInterest"
                  onClick={closeMobile}
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  My Interests
                </NavLink>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={closeMobile}
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  onClick={closeMobile}
                  className={({ isActive }) => (isActive ? active : normal)}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
