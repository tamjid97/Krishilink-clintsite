import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.int";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Current logged-in user check
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login"); // Login না থাকলে redirect
      } else {
        setUser(currentUser);
      }
    });

    // Cleanup
    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <div className="flex flex-col items-center">
          {/* Profile Picture / Initial */}
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mb-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-500">
                {user.displayName
                  ? user.displayName.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Name & Email */}
          <h2 className="text-xl font-semibold mb-1">
            {user.displayName || "No Name Provided"}
          </h2>
          <p className="text-gray-600 mb-4">{user.email}</p>

          {/* Logout Button */}
          <button
            onClick={() => {
              auth.signOut().then(() => navigate("/login"));
            }}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
