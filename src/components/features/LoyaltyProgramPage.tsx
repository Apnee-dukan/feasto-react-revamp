import React from 'react';

export const LoyaltyProgramPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center py-12 md:py-20 max-w-6xl mx-auto px-4">
        <div className="flex-1 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Loyalty Program & Membership
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Create meaningful connections with your customers by rewarding repeat visits—and help your business thrive.
          </p>
          <button className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
            Start Building Your Loyalty
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/public/dist/images/loyalty-rewards.jpg"
            alt="Loyalty program illustration"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {[
            {
              icon: '🎁',
              title: 'Points on Spend',
              text: 'Customers earn points automatically with every purchase—no extra work for your staff.',
            },
            {
              icon: '📈',
              title: 'Tiered Membership',
              text: 'Boost loyalty by offering tier upgrades when customers hit spending milestones.',
            },
            {
              icon: '📱',
              title: 'Digital Membership Cards',
              text: 'Offer hassle‑free mobile or QR code cards—no physical cards to carry or lose.',
            },
            {
              icon: '📧',
              title: 'Targeted Promotions',
              text: 'Use member data to send tailored offers—birthday discounts, special events, and more.',
            },
            {
              icon: '🔄',
              title: 'Redeem Points Easily',
              text: 'Customers can redeem rewards in-person or online—fast and intuitive.',
            },
            {
              icon: '🔍',
              title: 'Advanced Analytics',
              text: 'Gain insights into best customers, most popular rewards, and overall ROI.',
            },
          ].map((f, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow flex flex-col items-start gap-4">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1573497161008-7b2ec3cfa849?fit=crop&w=800&q=80"
              alt="Customer redeeming points at POS"
              className="w-full rounded-lg shadow"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1600180758891-4f1c75171c8f?fit=crop&w=800&q=80"
              alt="Membership tiers dashboard"
              className="w-full rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-12 text-center px-4">
        <h2 className="text-3xl font-semibold mb-4">Ready to boost your customer loyalty?</h2>
        <p className="text-gray-600 mb-6">
          Whether you’re just starting out or scaling, our loyalty tools help you build deeper customer relationships.
        </p>
        <button className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
          Try Loyalty Features
        </button>
      </section>
    </div>
  );
};

export default LoyaltyProgramPage;
