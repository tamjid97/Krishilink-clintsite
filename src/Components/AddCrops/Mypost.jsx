import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

const Mypost = () => {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit modal state
  const [editCrop, setEditCrop] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch user's crops
  const fetchCrops = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/crops`);
      const data = await res.json();
      // filter only logged-in user's crops
      const userCrops = data.filter(c => c.owner?.ownerEmail === user.email);
      setCrops(userCrops);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch crops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [user]);

  // Handle Edit button click
  const handleEditClick = (crop) => {
    setEditCrop(crop);
    setEditData({
      name: crop.name,
      type: crop.type,
      pricePerUnit: crop.pricePerUnit,
      unit: crop.unit,
      quantity: crop.quantity,
      description: crop.description,
      location: crop.location,
      image: crop.image,
    });
  };

  // Handle input change in edit modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Save edited crop
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/crops/${editCrop._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        toast.success("Crop updated successfully!");
        setEditCrop(null);
        fetchCrops();
      } else {
        toast.error("Failed to update crop");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // Delete crop
  const handleDelete = async (cropId) => {
    const confirm = window.confirm("Are you sure you want to delete this crop?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/crops/${cropId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Crop deleted successfully!");
        setCrops(crops.filter(c => c._id !== cropId));
      } else {
        toast.error("Failed to delete crop");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6">My Posts</h2>

      {loading ? (
        <p>Loading crops...</p>
      ) : crops.length === 0 ? (
        <p>No crops found. Add some!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Price/unit</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop._id} className="text-center">
                  <td className="p-2 border">
                    <img src={crop.image} alt={crop.name} className="w-16 h-16 object-cover mx-auto rounded"/>
                  </td>
                  <td className="p-2 border">{crop.name}</td>
                  <td className="p-2 border">{crop.type}</td>
                  <td className="p-2 border">{crop.pricePerUnit}</td>
                  <td className="p-2 border">{crop.quantity}</td>
                  <td className="p-2 border">{crop.location}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEditClick(crop)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Crop</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="type"
                value={editData.type}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="pricePerUnit"
                value={editData.pricePerUnit}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="unit"
                value={editData.unit}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="quantity"
                value={editData.quantity}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="image"
                value={editData.image}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setEditCrop(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypost;
