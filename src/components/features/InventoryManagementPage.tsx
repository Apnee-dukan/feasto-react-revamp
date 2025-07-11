import React from "react";

const features = [
  {
    icon: "📦",
    title: "Real‑Time Stock Levels",
    text: "Monitor inventory across all locations with instant updates after sales."
  },
  {
    icon: "🔔",
    title: "Low Stock Alerts",
    text: "Automatic notifications when items are running low—never miss a reorder point."
  },
  {
    icon: "🔄",
    title: "Seamless Sales Integration",
    text: "Every sale adjusts inventory—no manual tracking needed."
  },
  {
    icon: "📈",
    title: "Purchase Order Automation",
    text: "Generate POs based on sales trends and reorder levels."
  }
];

export const InventoryManagementPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-900">
    {/* Hero */}
    <section className="px-4 py-16 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Inventory Management Simplified
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Gain real‑time visibility, automate alerts & POs, sync data seamlessly with POS—designed for retailers & restaurateurs.
      </p>
      <button className="mt-8 px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
        Request a Demo
      </button>
    </section>

    {/* Features Grid */}
    <section className="py-12 max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {features.map((f, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <span className="text-3xl">{f.icon}</span>
            <div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-gray-600">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Visual Mockups */}
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=60"
          alt="Inventory Dashboard"
          className="w-full rounded-lg shadow"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Powerful Visual Insights
          </h2>
          <p className="text-gray-600 mb-6">
            Scan barcodes, import products, track inventory instantly, and
            visualize stock levels in intuitive charts.
          </p>
          <img
            src="/public/dist/images/im.jpg"
            alt="Barcode Scanning"
            className="w-3/4 rounded-lg shadow"
          />
        </div>
      </div>
    </section>

    {/* Footer CTA */}
    <section className="bg-gray-100 py-12 text-center">
      <h4 className="text-xl font-semibold mb-4">Ready to streamline your inventory?</h4>
      <p className="text-gray-600 mb-6">
        Request a demo or upgrade to build a smarter, more efficient stock system today.
      </p>
      <div className="space-x-4">
        <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
          Request Demo
        </button>
        <button className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50">
          Contact Sales
        </button>
      </div>
    </section>
  </div>
);

export default InventoryManagementPage;
