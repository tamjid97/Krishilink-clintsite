import React, { useState } from "react";
import { CreditCard, Heart } from "lucide-react";

const donationOptions = [
  { amount: 50, label: "৳50" },
  { amount: 100, label: "৳100" },
  { amount: 500, label: "৳500" },
  { amount: 1000, label: "৳1000" },
];

const Donate = () => {
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleDonate = () => {
    setToast({ show: true, message: "Thank you for your donation!" });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-5 bg-green-50 rounded-3xl shadow-lg relative">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-600 mb-8">
        Support Poor Farmers
      </h2>
      <p className="text-center text-gray-700 mb-12">
        Your contribution can make a difference. Help small farmers and support
        sustainable agriculture.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {donationOptions.map((option, index) => (
          <button
            key={index}
            className="bg-green-500 text-white font-semibold py-4 rounded-xl hover:bg-green-600 transition-colors duration-300"
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleDonate}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-300"
        >
          <CreditCard className="w-6 h-6" />
          Donate Now
        </button>
      </div>

      <p className="text-center text-gray-500 mt-6">
        <Heart className="inline w-5 h-5 text-red-500 mr-1" />
        Every donation matters!
      </p>

      {/* Toast Message */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in z-50">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Donate;
