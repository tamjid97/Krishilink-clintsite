import React from "react";

const Searsh = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search by crop name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
};

export default Searsh;
