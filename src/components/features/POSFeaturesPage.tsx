import React from "react";

const PosFeatures: React.FC = () => {
  const stats = [
    {
      icon: "📶",
      title: "Cashless Convenience",
      desc: "85% of customers prefer cashless payments. QR-based ordering and payments streamline service.",
    },
    {
      icon: "⚡",
      title: "Boost Efficiency",
      desc: "Restaurants using QR/tablet ordering report ~30% improvement in operational speed.",
    },
    {
      icon: "🖼️",
      title: "Visual Digital Menus",
      desc: "High‑quality menu images increase conversion rates by ~25%.",
    },
    {
      icon: "🔁",
      title: "Table Turnover",
      desc: "Serve up to 50% more customers in peak times with faster table rotation.",
    },
  ];

  const features = [
    {
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      title: "Mobile Ordering & Payments",
      desc: "Patrons scan a QR code to browse & pay instantly, or staff use a handheld POS to take orders tableside.",
    },
    {
      img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80",
      title: "Speedy Orders",
      desc: "Minimize trips between tables and the POS station for faster, more personal service.",
    },
    {
      img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80",
      title: "Real-Time Order Processing",
      desc: "Orders are instantly sent to the kitchen to reduce wait times and errors.",
    },
    {
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      title: "User-Friendly Interface",
      desc: "Intuitive design ensures quick onboarding and higher service efficiency.",
    },
  ];

  return (
    <div className="space-y-16 px-4 md:px-8 lg:px-16 py-12 bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            Transform Dining with <span className="text-orange-500">Point of Sale</span>
          </h1>
          <p className="text-lg text-gray-600">
            Bring new energy to your dining service with iPOS—a smart ordering
            system that speeds up service and keeps customers happy.
          </p>
          <button className="mt-4 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Get a Free Demo Today
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
            alt="POS Devices"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-8">Stats That Matter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3 px-4">
              <div className="text-4xl">{stat.icon}</div>
              <h3 className="text-xl font-medium">{stat.title}</h3>
              <p className="text-gray-600">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Sections */}
      <section className="space-y-20">
        {features.map((f, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-8`}
          >
            <div className="lg:w-1/2">
              <img
                src={f.img}
                alt={f.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gray-100 py-12 rounded-xl shadow-inner">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to boost your dining experience?
        </h2>
        <p className="text-gray-600 mb-6">
          Request a demo or start a free trial with our all‑in‑one POS solution.
        </p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
            Request Demo
          </button>
          <button className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default PosFeatures;
