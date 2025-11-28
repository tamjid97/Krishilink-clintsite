import React from "react";
import Cropsess from "./Cropsess";

const Crops = ({ cropsData }) => {
  if (!Array.isArray(cropsData) || cropsData.length === 0)
    return <p className="text-center mt-10">No crops available</p>;

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cropsData.map((crop) => (
          <Cropsess key={crop._id} crops={crop} />
        ))}
      </div>
    </div>
  );
};

export default Crops;
