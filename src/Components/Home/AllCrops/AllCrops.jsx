import React, { useEffect, useState } from "react";
import Cardcrops from "../LatestCrops/Cardcrops";
import Searsh from "./Searsh";

const AllCrops = () => {
  const [allCrops, setAllCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCrops = async () => {
      try {
        const res = await fetch("http://localhost:5000/crops");
        if (!res.ok) throw new Error("কৃষি তথ্য আনতে সমস্যা হয়েছে");

        const data = await res.json();
        setAllCrops(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCrops();
  }, []);

  if (loading) return <p className="text-center mt-10">Loding...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex flex-col justify-center items-center my-10">
        <h2 className="text-5xl font-bold text-emerald-500 tracking-wide">
          All Crops
        </h2>
      </div>
<div>
  <Searsh/>
</div>
      <div>
        <Cardcrops latestCrops={allCrops} />
      </div>
    </div>
  );
};

export default AllCrops;
