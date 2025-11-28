import React from "react";

const newsData = [
  {
    title: "Organic Farming Tips for 2025",
    date: "Nov 28, 2025",
    snippet:
      "Learn the latest techniques in organic farming to increase yield naturally.",
    image:
      "https://organicbc.org/wordpress/wp-content/uploads/2025/08/Copy-of-Organic-Month-2025-FB-social-posts.jpg?fit=1000%2C200",
  },
  {
    title: "New Crop Varieties Released",
    date: "Nov 25, 2025",
    snippet:
      "Discover the newest crop varieties that are more resistant to pests and drought.",
    image:
      "https://pbs.twimg.com/media/GqIBusNagAAduRp?format=jpg&name=large",
  },
  {
    title: "Sustainable Irrigation Practices",
    date: "Nov 20, 2025",
    snippet:
      "Tips and tricks to conserve water while maintaining healthy crops.",
    image:
      "https://bradynursery.com/wp-content/uploads/2025/05/Brady_SustainableWaterPracticesBlogPost_500.jpg",
  },
];

const AgroNews = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-5">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-600 mb-12">
        Agro News & Blogs
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{news.date}</p>
              <p className="text-gray-700">{news.snippet}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgroNews;
