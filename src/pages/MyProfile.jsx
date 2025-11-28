import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.int";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        {" "}
        <p className="text-lg text-slate-600 animate-pulse">
          Loading user data...
        </p>{" "}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {" "}
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-sm text-center">
        {" "}
        {/* Profile Picture / Initial */}{" "}
        <div className="w-28 h-28 rounded-full bg-white/60 shadow-inner overflow-hidden flex items-center justify-center mx-auto mb-5">
          {" "}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-slate-600">
              {" "}
              {user.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()}{" "}
            </span>
          )}{" "}
        </div>{" "}
        {/* Name */}{" "}
        <h2 className="text-2xl font-semibold text-slate-700 mb-1">
          {" "}
          {user.displayName || "Unnamed User"}{" "}
        </h2>{" "}
        {/* Email */} <p className="text-slate-600 mb-6">{user.email}</p>{" "}
        {/* Logout Button */}{" "}
        <button
          onClick={() => {
            auth.signOut().then(() => navigate("/login"));
          }}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          {" "}
          Logout{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};
export default MyProfile;
