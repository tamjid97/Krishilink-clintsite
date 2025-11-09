// Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Desktop links
  const guestLinksDesktop = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/all-crops">All Crops</Link></li>
    </>
  );

  const userLinksDesktop = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/all-crops">All Crops</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/add-crops">Add Crops</Link></li>
      <li><Link to="/my-posts">My Posts</Link></li>
      <li><Link to="/my-interests">My Interests</Link></li>
    </>
  );

  // Mobile dropdown links
  const guestLinksMobile = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/all-crops">All Crops</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </>
  );

  const userLinksMobile = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/all-crops">All Crops</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/add-crops">Add Crops</Link></li>
      <li><Link to="/my-posts">My Posts</Link></li>
      <li><Link to="/my-interests">My Interests</Link></li>
      <li>
        <button
          onClick={handleLogout}
          className="btn btn-ghost w-full text-left text-white bg-red-500 hover:bg-red-600 cursor-pointer transition-all duration-200"
        >
          Sign Out
        </button>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 bg-green-300 shadow-sm z-50 px-4">
      <div className="navbar max-w-7xl mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
            >
              {user ? userLinksMobile : guestLinksMobile}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost text-xl font-bold">
            KrishiLink
          </Link>
        </div>

        {/* Navbar Center (Desktop Links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? userLinksDesktop : guestLinksDesktop}
          </ul>
        </div>

        {/* Navbar End (Buttons) */}
        <div className="navbar-end space-x-2">
          {!user && (
            <Link
              to="/register"
              className="btn bg-green-500 text-white hover:bg-green-700 transition-all duration-200"
            >
              Register
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="btn bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
            >
              Sign Out
            </button>
          )}

          {!user && (
            <Link
              to="/login"
              className="btn bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
