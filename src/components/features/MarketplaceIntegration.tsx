import React from 'react';
import { Settings, Shuffle, PieChart } from 'lucide-react';

const features = [
  {
    title: 'Efficiency',
    desc: 'Automate processes to save time and eliminate manual errors.',
    icon: Settings,
  },
  {
    title: 'Flexibility',
    desc: 'Adapt to customer demand with seamless integration between physical and online stores.',
    icon: Shuffle,
  },
  {
    title: 'Insights',
    desc: 'Make data-driven decisions with consolidated sales and inventory analytics.',
    icon: PieChart,
  },
];


const MarketplaceIntegration = () => {
    
  return (
    <div className="bg-white text-[#0b2440] font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-20 px-6">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Take the <br />
            Guesswork out of <br />
            <span className="text-orange-500">Marketplace Integration</span>
          </h1>
          <p className="text-lg text-[#6c7a89] mb-6">
            Expand your business seamlessly across retail and online channels with Feasto Marketplace Integration, the ultimate solution for synchronizing your operations.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600">
            Get a Free Demo Today
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img src="/public/dist/images/food.jpg" alt="GrabFood Delivery" className="rounded-xl w-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#f7f8fa] py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-4">
        {features.map(({ title, desc, icon: Icon }, i) => (
          <div key={i} className="flex flex-col items-center">
            <Icon className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-[#6c7a89]">{desc}</p>
          </div>
        ))}
      </div>
    </section>

      {/* Malaysian Business Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center">
        <img src="/public/dist/images/dishes.webp" alt="Malaysian Dishes" className="md:w-1/2 rounded-xl mb-10 md:mb-0" />
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-bold mb-4">Designed for Malaysian Businesses</h2>
          <p className="mb-3"><strong>Localized Marketplace Support</strong><br />
            Seamlessly integrate with popular Malaysian marketplaces GrabFood and FoodPanda (more to come later), or your own eCommerce website. Tailored for the Malaysian market, Feasto ensures you stay competitive.</p>
          <p><strong>Scalable for Growth</strong><br />
            Whether you’re running a small boutique or a multi-location retail chain, Feasto adapts to your business needs.</p>
        </div>
      </section>

      {/* Common Errors Section */}
      <section className="bg-[#f7f8fa] py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl font-bold mb-6">Say Goodbye to Common Errors</h2>
            <ul className="space-y-4 text-[#6c7a89]">
              <li>
                <strong>Eliminate Overselling</strong><br />
                Maintain up-to-date stock levels across all platforms with accurate inventory data.
              </li>
              <li>
                <strong>Accurate Sales Insights</strong><br />
                Real-time consolidated data across all channels.
              </li>
              <li>
                <strong>Error-Free Product Listings</strong><br />
                Update once, reflect everywhere. Save time and avoid costly mistakes.
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <img src="/public/dist/images/analytics.avif" alt="Barista Analytics" className="rounded-xl w-full" />
          </div>
        </div>
      </section>

      {/* Online Business Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img src="/public/dist/images/dashboard.jpg" alt="Feasto Dashboard" className="rounded-xl w-full" />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-6">Simplify Your Online Business Operations</h2>
            <ul className="space-y-4 text-[#6c7a89]">
              <li>
                <strong>Seamless Offline-to-Online Integration</strong><br />
                Connect your physical retail store with online platforms easily.
              </li>
              <li>
                <strong>Real-Time Sync Across Channels</strong><br />
                Fast, accurate inventory, sales, and product data synchronization.
              </li>
              <li>
                <strong>Centralized Management Dashboard</strong><br />
                Manage everything from one platform with full visibility.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketplaceIntegration;
