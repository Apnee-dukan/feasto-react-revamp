import React from "react";
import PricingTablesAccordion from "./PricingTablesAccordion";

const plans = [
  {
    title: "Lite",
    price: "RM79",
    description: "Perfect for food trucks, kiosks & cafes just starting out.",
    features: [
      "Inventory Management",
      "Cloud-based POS System",
      "Basic Sales Reporting",
      "Staff Management",
      "Unlimited Users",
      "Supports 1 Outlet",
    ],
    cta: "Start Now",
    note: "*RM79/month when billed annually",
  },
  {
    title: "Growth",
    price: "RM99",
    description: "Ideal for restaurants and retailers looking to grow.",
    features: [
      "Everything in Lite",
      "QR Code Table Ordering",
      "Online Store (Beep)",
      "Advanced Reporting",
      "Customer Loyalty System",
      "CRM & Marketing Tools",
    ],
    cta: "Start Now",
    note: "*RM99/month when billed annually",
    popular: true,
  },
  {
    title: "Advanced",
    price: "RM129",
    description: "Tailored for multi-outlet chains and enterprises.",
    features: [
      "Everything in Growth",
      "API Access",
      "Enterprise Reporting",
      "Multi-Outlet Support",
      "Dedicated Success Manager",
      "Custom Integrations",
    ],
    cta: "Start Now",
    note: "Get a quote",
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 px-4 py-12">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-gray-600">
          Pick the plan that’s right for your business. No hidden fees.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border rounded-2xl p-6 flex flex-col justify-between shadow-md ${
              plan.popular ? "border-yellow-500 ring-2 ring-yellow-400" : ""
            }`}
          >
            {plan.popular && (
              <div className="text-center mb-2">
                <span className="bg-yellow-400 text-white text-sm px-3 py-1 rounded-full uppercase font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-center mb-2">{plan.title}</h2>
              <div className="text-center text-4xl font-extrabold text-orange-600">
                {plan.price === "Custom" ? (
                  <span className="text-xl">{plan.price}</span>
                ) : (
                  <>
                    {plan.price}
                    <span className="text-sm font-normal text-gray-600">/mo</span>
                  </>
                )}
              </div>
              <p className="text-center text-sm text-gray-500 mt-1">{plan.note}</p>
              <p className="text-center mt-4 text-gray-700">{plan.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-800">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => {
                window.location.href = "https://feasto.com.my/web/register"
            }} className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
              {plan.cta}
            </button>
          </div>
        ))}
      </section>

      <section className="text-center mt-16">
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          All plans come with 24/7 customer support and onboarding assistance.
        </p>
      </section>
      <PricingTablesAccordion />
    </div>
  );
};

export default Pricing;
