import { Coffee, CreditCard, MapPin, Utensils } from 'lucide-react';
import React from 'react';
import { FeatureCard } from '../Home';

const benefits = [
  {
    icon: '📄',
    title: 'GST / SST Compliant',
    text: 'Automated invoice formats compliant with Malaysian tax regulations.',
  },
  {
    icon: '📧',
    title: 'Instant Digital Delivery',
    text: 'Send invoices via email or WhatsApp instantly—no printing required.',
  },
  {
    icon: '🔒',
    title: 'Secure & Tamper‑Proof',
    text: 'Invoices are encrypted and cannot be altered once sent.',
  },
  {
    icon: '📊',
    title: 'Track & Record',
    text: 'View payment status and history for all invoices in one dashboard.',
  },
];

export const EInvoicingPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-900">
    {/* Hero */}
    <section className="flex flex-col md:flex-row items-center max-w-6xl mx-auto py-12 px-4">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold">
          Simplify E‑Invoicing & Tax Compliance
        </h1>
        <p className="text-lg text-gray-600">
          Create and send digital invoices compliant with Malaysian tax laws (SST, GST) in just seconds.
        </p>
        <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
          Try E‑Invoicing Now
        </button>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img
          src="/public/dist/images/eInvoice.webp"
          alt="E‑Invoicing dashboard"
          className="w-full rounded-lg shadow"
        />
      </div>
    </section>

    {/* Benefits */}
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="text-4xl">{b.icon}</span>
            <div>
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="text-gray-600">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* How It Works */}
     <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-orange-600 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<MapPin size={40} />} title="Location">
              Order favorite food from our nearest outlet based on your location.
            </FeatureCard>
            <FeatureCard icon={<Coffee size={40} />} title="Menu">
              Browse the menus to find the food you would like to order.
            </FeatureCard>
            <FeatureCard icon={<CreditCard size={40} />} title="Payment">
              Pay via online using debit card with our secure payment or on delivery.
            </FeatureCard>
            <FeatureCard icon={<Utensils size={40} />} title="Enjoy">
              Get your food delivered at the doorstep and enjoy your day.
            </FeatureCard>
          </div>
        </div>
      </section>

    {/* CTA */}
    <section className="bg-gray-100 py-12 text-center px-4">
      <h2 className="text-3xl font-semibold mb-4">Start Sending Digital Invoices Today</h2>
      <p className="text-gray-600 mb-6">
        Compliant, streamlined, and trackable—invoices made easy.
      </p>
      <button className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
        Get Started
      </button>
    </section>
  </div>
);

export default EInvoicingPage;
