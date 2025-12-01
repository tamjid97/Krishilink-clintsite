import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";

const MyInterest = () => {
  const { user } = useAuth(); // logged in user
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; // wait until user loads

    fetch(`http://localhost:5000/interests?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading...</div>;

  if (!interests || interests.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        You have not shown interest in any crops yet.
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Interests
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md">
          <thead>
            <tr className="bg-emerald-100 text-gray-700">
              <th className="py-3 px-6 text-left">Crop Name</th>
              <th className="py-3 px-6 text-left">Owner</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((i) => (
              <tr
                key={i._id}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6">{i.cropName || "N/A"}</td>
                <td className="py-4 px-6">{i.ownerName || "N/A"}</td>
                <td className="py-4 px-6">
                  {i.quantity} {i.unit || "kg"}
                </td>
                <td className="py-4 px-6">{i.message}</td>
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
                    {i.status.charAt(0).toUpperCase() + i.status.slice(1)}
                  </span>
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
