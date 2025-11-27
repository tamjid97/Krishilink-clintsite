import React, { use } from "react";
import Cropsess from "./Cropsess";

const Cardcrops = ({ latestCropSPromise }) => {
  const crops = use(latestCropSPromise);
  console.log(crops);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 lg:gap-20   ">
        {crops.map((crops) => (
          <Cropsess key={crops._id} crops={crops}></Cropsess>
        ))}
      </div>
    </div>
  );
};

export default Cardcrops;
