import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

const Addcrops = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      name: formData.name,
      type: formData.type,
      pricePerUnit: Number(formData.pricePerUnit),
      unit: formData.unit,
      quantity: Number(formData.quantity),
      description: formData.description,
      location: formData.location,
      image: formData.image,
      owner: {
        ownerEmail: user?.email,
        ownerName: user?.displayName,
      },
      createdAt: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5000/crops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast.success("Crop added successfully!");
        navigate("/Mypost");

      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to add crop");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Add New Crop</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Crop Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="type"
            placeholder="Type (Vegetable, Fruit, Grain)"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Price & Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="pricePerUnit"
            placeholder="Price per unit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit (kg, ton, bag)"
            value={formData.unit}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Quantity & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="quantity"
            placeholder="Estimated Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL (https://...)"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {formData.image && (
          <div className="flex justify-center mt-4">
            <img
              src={formData.image}
              alt="Crop Preview"
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white rounded-lg font-semibold transition ${
            loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Crop"}
        </button>
      </form>
    </div>
  );
};

export default Addcrops;
