import React, { useEffect, useState } from "react";
import Cardcrops from "../LatestCrops/Cardcrops";
import Searsh from "./Searsh";

const AllCrops = () => {
  const [allCrops, setAllCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllCrops = async () => {
      try {
        const res = await fetch(
          "https://smart-deals-api-server-sepia-xi.vercel.app/crops"
        );
        if (!res.ok) throw new Error("কৃষি তথ্য আনতে সমস্যা হয়েছে");
        const data = await res.json();
        setAllCrops(data);
        setFilteredCrops(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCrops();
  }, []);

  useEffect(() => {
    const filtered = allCrops.filter((crop) =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCrops(filtered);
  }, [searchTerm, allCrops]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex flex-col justify-center items-center my-10">
        <h2 className="text-5xl font-bold text-emerald-500 tracking-wide">
          All Crops
        </h2>
      </div>

      {/* Search */}
      <div>
        <Searsh searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Cards */}
      {filteredCrops.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-xl">
          No results found.
        </p>
      ) : (
        <div>
          <Cardcrops latestCrops={filteredCrops} />
        </div>
      )}
    </div>
  );
};

export default AllCrops;
