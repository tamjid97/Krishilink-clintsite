import React from "react";

const doctors = [
  {
    name: "Dr. Rahim Hossain",
    specialty: "Crop Specialist",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    bio: "Expert in organic farming and crop disease management with 10+ years of experience.",
  },
  {
    name: "Dr. Ayesha Siddiqua",
    specialty: "Soil & Fertilizer Expert",
    image: "https://www.shutterstock.com/image-photo/happy-veterinarian-doctor-man-holding-600nw-2618744561.jpg",
    bio: "Helps farmers optimize soil health and nutrient management for better yield.",
  },
  {
    name: "Dr. Imran Karim",
    specialty: "Irrigation Consultant",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    bio: "Specialist in sustainable irrigation practices to conserve water resources.",
  },
];

const AgroDoctor = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-5">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-emerald-600 mb-12">
        Agro Doctor / Expert Advice
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-1">{doc.name}</h3>
              <p className="text-green-600 font-medium mb-2">{doc.specialty}</p>
              <p className="text-gray-600 text-sm">{doc.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgroDoctor;
