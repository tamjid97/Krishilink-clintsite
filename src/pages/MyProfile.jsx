import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase/firebase.int";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <p className="text-lg text-slate-600 animate-pulse">
          Loading user data...
        </p>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    let photoURL = user.photoURL;

    try {
      // Upload new photo if selected
      if (photoFile) {
        const storageRef = ref(storage, `profile/${user.uid}/${photoFile.name}`);
        await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update displayName and photoURL
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      setUser({ ...user, displayName, photoURL });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-sm text-center">
        {/* Profile Picture */}
        <div className="w-28 h-28 rounded-full bg-white/60 shadow-inner overflow-hidden flex items-center justify-center mx-auto mb-5">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-slate-600">
              {user.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {!editMode ? (
          <>
            {/* Name */}
            <h2 className="text-2xl font-semibold text-slate-700 mb-1">
              {user.displayName || "Unnamed User"}
            </h2>
            {/* Email */}
            <p className="text-slate-600 mb-6">{user.email}</p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-emerald-500 text-white py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  auth.signOut().then(() => navigate("/login"));
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          // Edit Form
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex justify-between">
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
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
