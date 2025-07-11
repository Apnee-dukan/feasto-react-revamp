import React from "react";

const analyticsFeatures = [
  {
    icon: "📊",
    title: "Real‑Time Dashboard",
    description:
      "Monitor sales, revenue, and key metrics live—no more waiting till end-of-day.",
  },
  {
    icon: "📈",
    title: "Trends & Insights",
    description:
      "Spot high-performing items, customer habits, and revenue shifts easily.",
  },
  {
    icon: "🧾",
    title: "Detailed Reports",
    description:
      "Export reports by store, staff, or time period for accounting and planning.",
  },
  {
    icon: "📍",
    title: "Location & Staff Metrics",
    description:
      "Track performance by location or staff member to optimize operations.",
  },
];

export const ReportAnalyticsPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-900">
    {/* Hero Section */}
    <section className="flex flex-col md:flex-row items-center max-w-6xl mx-auto py-12 px-4">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">Powerful Reporting & Analytics</h1>
        <p className="text-lg text-gray-600 mb-6">
          Unlock real-time insights into your sales, customers, and staff performance to drive smarter decisions.
        </p>
        <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
          Book a Demo
        </button>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img
          src="/public/dist/images/analytics.jpg"
          alt="Analytics Dashboard"
          className="w-full rounded-lg shadow"
        />
      </div>
    </section>

    {/* Feature Section */}
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {analyticsFeatures.map((f, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="text-3xl">{f.icon}</span>
            <div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Image Gallery */}
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src="/public/dist/images/sales-timeChart.jpg"
          alt="Sales vs Time Chart"
          className="w-full rounded-lg shadow"
        />
        <img
          src="/public/dist/images/revenue_breakdown.jpg"
          alt="Revenue Breakdown"
          className="w-full rounded-lg shadow"
        />
      </div>
    </section>

    {/* Stats Section */}
    <section className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-semibold mb-8">Stats That Matter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {["Sales Uptime", "Customer Insights", "Staff Performance", "Location Growth"].map((s, i) => (
          <div key={i} className="space-y-2">
            <span className="block text-4xl text-orange-600">✔</span>
            <h4 className="text-xl font-semibold">{s}</h4>
            <p className="text-gray-600">
              {s === "Sales Uptime"
                ? "Track uptime and peak sales periods."
                : s === "Customer Insights"
                ? "Know returning customers and purchase trends."
                : s === "Staff Performance"
                ? "See top performers and training needs."
                : "Measure sales by location or region."}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Section */}
    <section className="bg-gray-100 py-12 text-center">
      <h4 className="text-xl font-semibold mb-4">Boost your business with smarter data</h4>
      <p className="text-gray-600 mb-6">
        Get actionable analytics delivered straight to your dashboard.
      </p>
      <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
        Request Demo
      </button>
    </section>
  </div>
);

export default ReportAnalyticsPage;
