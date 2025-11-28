import React from "react";
import { CheckCircle, ArrowRightCircle, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "Create Your Account",
    desc: "Sign up easily using your email and start exploring the platform.",
  },
  {
    icon: <ArrowRightCircle className="w-10 h-10" />,
    title: "Browse Latest Crops",
    desc: "View fresh crop posts uploaded by farmers from different locations.",
  },
  {
    icon: <CheckCircle className="w-10 h-10" />,
    title: "Send Interest Request",
    desc: "Contact the crop owner by sending an interest request directly.",
  },
  {
    icon: <CheckCircle className="w-10 h-10" />,
    title: "Deal & Complete",
    desc: "Finalize the deal and complete the transaction securely.",
  },
];

const HowToWork = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-5">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-emerald-600 mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center border hover:shadow-xl transition-all duration-300"
          >
            <div className="text-emerald-500 flex justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToWork;
