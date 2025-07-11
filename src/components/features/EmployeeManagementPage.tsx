import React from "react";

const features = [
  {
    icon: "🧑‍💼",
    title: "Onboard & Manage Staff",
    text: "Add new employees, assign roles & permissions, set pay rates, and clock‑in options via PIN or badge login.",
  },
  {
    icon: "⏱️",
    title: "Clock‑In / Clock‑Out Tracking",
    text: "Employees securely clock in/out using PINs or access cards, with full shift logs and automated timesheet tracking.",
  },
  {
    icon: "📊",
    title: "Payroll & Performance",
    text: "Auto‑calculate wages, overtime, tips, and taxes. Monitor individual performance metrics like sales, refunds, and order speed.",
  },
  {
    icon: "⚙️",
    title: "Role‑Based Permissions",
    text: "Define granular access levels—manager, cashier, admin—restricting sensitive actions to authorized roles only.",
  },
  {
    icon: "📈",
    title: "Shift Scheduling & Analytics",
    text: "Schedule shifts based on sales forecasts, approve time‑off, and generate reports to optimize labor costs.",
  },
  {
    icon: "🔒",
    title: "Security & Audit Trails",
    text: "Trace every transaction to individual staff members. Protect against theft and maintain accountability with detailed logs.",
  },
];

const faqs = [
  {
    q: "Can employees clock in with badges?",
    a: "Yes. Enable badge login and employees may use assigned access cards or badges to clock in/out securely.",
  },
  {
    q: "How are pay rates and overtime managed?",
    a: "Set hourly rates, overtime rules, and payroll policies—POS auto‑calculates and integrates with timekeeping seamlessly.",
  },
  {
    q: "Can I restrict staff actions?",
    a: "Absolutely. Use role-based permission controls to limit actions like discounts, refunds, and report access.",
  },
];

const EmployeeManagementPage: React.FC = () => (
  <div className="bg-white text-gray-900">
    {/* Hero */}
    <section className="flex flex-col-reverse md:flex-row items-center gap-8 max-w-6xl mx-auto py-16 px-4">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Employee Management, Simplified
        </h1>
        <p className="text-lg text-gray-600">
          Hire, schedule & pay your team with confidence. Efficient timesheets, secure access, and built-in analytics—all in one platform.
        </p>
        <button className="mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          Request a Free Demo
        </button>
      </div>
      <div className="flex-1">
        <img
          src="https://source.unsplash.com/collection/922603/800x600"
          alt="Employee clock-in"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </section>

    {/* Features */}
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((f, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="text-4xl">{f.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
            <p className="text-gray-600 mt-2">{f.text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Mockups */}
    <section className="py-12 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="https://source.unsplash.com/collection/9589797/800x600"
          alt="Shift scheduling screen"
          className="w-full rounded-lg shadow"
        />
        <img
          src="https://source.unsplash.com/collection/8659666/800x600"
          alt="Payroll dashboard"
          className="w-full rounded-lg shadow"
        />
      </div>
    </section>

    {/* FAQ */}
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} className="mb-4 bg-gray-50 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">{faq.q}</summary>
            <p className="mt-2 text-gray-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-12 bg-gray-100 text-center">
      <h3 className="text-xl font-semibold mb-4">Ready to streamline your staffing?</h3>
      <p className="text-gray-600 mb-6">
        Discover how our all‑in‑one POS can help you hire, manage, and retain top talent effortlessly.
      </p>
      <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
        Get Started
      </button>
    </section>
  </div>
);

export default EmployeeManagementPage;
