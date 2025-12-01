import React, { useState } from "react";

const Searsh = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // যদি data undefined হয়
  const safeData = Array.isArray(data) ? data : [];

  const filteredData = safeData.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const artist = item.artistName?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return title.includes(search) || artist.includes(search);
  });

  return (
    <div className="flex flex-col items-center">

      <input
        type="text"
        placeholder="Search by title or artist..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 w-80 px-4 py-2 border rounded-full"
      />

      <div className="mt-6 grid grid-cols-1 gap-4"> 
        {filteredData.map((item) => (
          <div key={item.name} className="border p-4 rounded-xl shadow">
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-gray-600">{item.artistName}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Searsh;
