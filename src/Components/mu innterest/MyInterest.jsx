import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

const MyInterest = () => {
  const { user } = useAuth();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");

  const fetchInterests = async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(
        `http://localhost:5000/interests?userEmail=${user.email}`
      );
      const data = await res.json();
      setInterests(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch interests!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, [user?.email]);

  const handleAction = async (interestId, cropId, status) => {
    try {
      const res = await fetch("http://localhost:5000/interest/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interestId, cropId, status }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Interest ${status} successfully!`);
        setInterests((prev) =>
          prev.map((i) => (i._id === interestId ? { ...i, status } : i))
        );
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const sortedInterests = [...interests].sort((a, b) => {
    if (sortBy === "recent")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "status")
      return (a.status || "pending").localeCompare(b.status || "pending");
    return 0;
  });

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (!interests || interests.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        No interests found.
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Interests
      </h1>

      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-1 rounded-lg"
        >
          <option value="recent">Sort by Recent</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md">
          <thead>
            <tr className="bg-emerald-100 text-gray-700">
              <th className="py-3 px-6 text-left">Crop Name</th>
              <th className="py-3 px-6 text-left">Owner</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedInterests.map((i) => (
              <tr
                key={i._id}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6">{i.cropName || "N/A"}</td>
                <td className="py-4 px-6">{i.userName || "N/A"}</td>
                <td className="py-4 px-6">
                  {i.quantity || 0} {i.unit || "kg"}
                </td>
                <td className="py-4 px-6">{i.message || "-"}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      i.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : i.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {i.status
                      ? i.status.charAt(0).toUpperCase() + i.status.slice(1)
                      : "Pending"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {(!i.status || i.status === "pending") && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleAction(i._id, i.cropId, "accepted")
                        }
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleAction(i._id, i.cropId, "rejected")
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInterest;
