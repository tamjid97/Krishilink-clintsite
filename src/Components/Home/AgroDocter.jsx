import React from "react";

const doctors = [
  {
    name: "Dr. Rahim Hossain",
    specialty: "Crop Specialist",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    bio: "Expert in organic farming and crop disease management with 10+ years of experience.",
  },
  {
    name: "Dr. Ayesha Siddiqua",
    specialty: "Soil & Fertilizer Expert",
    image:
      "https://www.shutterstock.com/image-photo/happy-veterinarian-doctor-man-holding-600nw-2618744561.jpg",
    bio: "Helps farmers optimize soil health and nutrient management for better yield.",
  },
  {
    name: "Dr. Imran Karim",
    specialty: "Irrigation Consultant",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    bio: "Specialist in sustainable irrigation practices to conserve water resources.",
  },
];

const AgroDoctor = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-5">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-emerald-700 mb-12 drop-shadow-sm">
        Agro Doctor / Expert Advice
      </h2>

      {/* Doctor Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-lg border border-emerald-100 shadow-xl rounded-3xl overflow-hidden 
                       hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
          >
            {/* Image */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">{doc.name}</h3>

              <p className="text-emerald-600 font-medium mt-1 text-lg">
                {doc.specialty}
              </p>

              <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                {doc.bio}
              </p>

              <button
                className="mt-5 px-6 py-2 bg-emerald-600 text-white rounded-xl shadow 
          hover:bg-emerald-700 transition-colors duration-300"
              >
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgroDoctor;
