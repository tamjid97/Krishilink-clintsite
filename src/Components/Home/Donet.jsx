import React, { useState } from "react";
import { CreditCard, Heart, CheckCircle } from "lucide-react";

const donationOptions = [
  { amount: 50, label: "৳50" },
  { amount: 100, label: "৳100" },
  { amount: 500, label: "৳500" },
  { amount: 1000, label: "৳1000" },
];

const Donate = () => {
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleDonate = () => {
    if (!selected) {
      setToast({ show: true, message: "Please choose an amount!" });
    } else {
      setToast({ show: true, message: "Thank you for your donation!" });
    }

    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-5">
      {/* Background Gradient */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl p-10 border border-white/40 backdrop-blur-md">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-4">
          Support Poor Farmers
        </h2>

        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Your small contribution brings big changes. Help improve the lives of small farmers and support sustainable agriculture.
        </p>

        {/* Donation buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {donationOptions.map((option) => (
            <button
              key={option.amount}
              onClick={() => setSelected(option.amount)}
              className={`py-4 text-lg font-semibold rounded-xl border-2 transition-all duration-300 shadow
                ${
                  selected === option.amount
                    ? "bg-green-600 text-white border-green-700 shadow-lg scale-105"
                    : "bg-white text-green-700 border-green-300 hover:bg-green-100"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Donate Now button */}
        <div className="text-center">
          <button
            onClick={handleDonate}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-10 py-4 rounded-2xl 
            font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <CreditCard className="w-6 h-6" />
            Donate Now
          </button>
        </div>

        {/* Bottom text */}
        <p className="text-center text-gray-600 mt-8 text-lg">
          <Heart className="inline w-5 h-5 text-red-500 mr-1" />
          Every donation makes a difference.
        </p>
      </div>

      {/* Beautiful Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-2 animate-[slideUp_0.5s_ease-out] z-50">
          <CheckCircle className="w-5 h-5" />
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Donate;
