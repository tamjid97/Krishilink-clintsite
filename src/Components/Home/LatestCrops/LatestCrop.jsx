import React, { useEffect, useState } from "react";
import Cardcrops from "./Cardcrops";
import { Link } from "react-router-dom"; // corrected import

const LatestCrop = () => {
  const [latestCrops, setLatestCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestCrops = async () => {
      try {
        const res = await fetch("http://localhost:5000/latest-crops");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setLatestCrops(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCrops();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center my-10">
        <h2 className="text-5xl font-bold text-emerald-500 tracking-wide">
          Latest Crop
        </h2>
      </div>

      <div>
        <Cardcrops latestCrops={latestCrops} />
      </div>

      <div className="flex justify-center mt-5">
        <Link
          to="/all-crops"
          className="flex justify-center items-center
          mt-4 w-35 py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600
          shadow-md hover:shadow-xl 
          hover:brightness-110 hover:-translate-y-1
          transition-all duration-300 ease-out"
        >
          All Crops
        </Link>
      </div>
    </div>
  );
};

export default LatestCrop;
