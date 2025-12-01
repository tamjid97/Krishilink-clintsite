import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.int";
import { updateProfile } from "firebase/auth"; // firebase/auth থেকে সরাসরি import
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      setUser({ ...user, displayName, photoURL });
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 text-center">
        {/* Profile Picture */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-gray-500">
              {displayName
                ? displayName.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {!editMode ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 mb-1">
              {displayName || "Unnamed User"}
            </h2>
            <p className="text-gray-500 mb-6">{user.email}</p>

            <div className="space-y-3">
              <button
                onClick={() => setEditMode(true)}
                className="w-full py-3 bg-green-500 text-white rounded-full font-medium shadow hover:bg-green-600 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() =>
                  auth.signOut().then(() => navigate("/login"))
                }
                className="w-full py-3 bg-red-500 text-white rounded-full font-medium shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-left text-gray-600 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-left text-gray-600 mb-1">
                Profile Image URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            {photoURL && (
              <div className="flex justify-center mt-2">
                <img
                  src={photoURL}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                />
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
