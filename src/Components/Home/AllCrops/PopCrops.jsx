import React from "react";
import locationicon from "../../../assets/icons8-location-64.png";
import { Link } from "react-router-dom";

const PopCrops = ({ crop }) => {
  const { _id, image, name, quantity, unit, pricePerUnit, location } = crop;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 w-96">
      {/* Image */}
      <figure className="rounded-xl overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover hover:scale-105 transition duration-300"
        />
      </figure>

      {/* Content */}
      <div className="mt-4 space-y-3 px-2">
        {/* Name and Quantity */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">
            {quantity} {unit}
          </p>
        </div>

        {/* Price and Location */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-green-600">
            ${pricePerUnit}
          </p>

          <div className="flex items-center gap-1 text-gray-600">
            <img src={locationicon} alt="" className="w-5 h-5" />
            <span className="font-medium">{location}</span>
          </div>
        </div>

        {/* View Details Button */}
        <div
          className="
          mt-4 w-full py-2 rounded-xl text-white font-semibold
          bg-gradient-to-r from-green-400 via-emerald-500 to-green-600
        shadow-md hover:shadow-lg hover:opacity-95
              transition-all duration-300"
        >
          <Link
            to={`/crops/${_id}`}
            className="flex justify-center
                
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopCrops;
