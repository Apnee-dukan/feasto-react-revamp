import React, { useState } from "react";

const tableSections = [
      {
    title: "Inventory Management",
    rows: [
      { feature: "Manage product details", Lite: true, Growth: true, Advanced: true },
      { feature: "Batch import products", Lite: true, Growth: true, Advanced: true },
      { feature: "Download products list", Lite: true, Growth: true, Advanced: true },
      { feature: "Manage and return stock to suppliers", Lite: true, Growth: true, Advanced: true },
      { feature: "Monitor low stock items", Lite: true, Growth: true, Advanced: true },
      { feature: "Generate Purchase Orders", Lite: true, Growth: true, Advanced: true },
      { feature: "Stock Take", Lite: true, Growth: true, Advanced: true },
      { feature: "Audit trail", Lite: true, Growth: true, Advanced: true },
      { feature: "Serial Number tracking", Lite: true, Growth: true, Advanced: true },
      { feature: "Composite Inventory", Lite: true, Growth: true, Advanced: true },
      { feature: "Adjust pricing by stores (Price Books)", Lite: true, Growth: true, Advanced: true },
      { feature: "Enable low stock e-mail alerts", Lite: true, Growth: true, Advanced: true },
      { feature: "Transfer stock between stores", Lite: true, Growth: true, Advanced: true },
    ],
  },
  {
    title: "Customers",
    rows: [
      { feature: "Store customer information (CRM)", Lite: true, Growth: true, Advanced: true },
      { feature: "Track customer purchase history", Lite: true, Growth: true, Advanced: true },
      { feature: "Customer-Facing Display", Lite: true, Growth: true, Advanced: true },
      { feature: "Customisable promotions", Lite: true, Growth: true, Advanced: true },
      { feature: "Customer database & CRM", Lite: true, Growth: true, Advanced: true },
      { feature: "Create customer loyalty program (with add-on subscription)", Lite: true, Growth: true, Advanced: true },
      { feature: "Send SMS blasts to customers (with add-on subscription)", Lite: true, Growth: true, Advanced: true },
      { feature: "Send WhatsApp messages blasts to customers (with add-on subscription)", Lite: true, Growth: true, Advanced: true },
    ],
  },
    {
    title: "Reports",
    rows: [
      { feature: "Generate reports by transaction(day, hour, shift)", Lite: true, Growth: true, Advanced: true },
      { feature: "Identify Best Selling products", Lite: true, Growth: true, Advanced: true },
      { feature: "Analyze total stock value", Lite: true, Growth: true, Advanced: true },
      { feature: "Track Pre-Orders", Lite: true, Growth: true, Advanced: true },
      { feature: "Monitor promotions performance", Lite: true, Growth: true, Advanced: true },
      { feature: "Loyalty report", Lite: true, Growth: true, Advanced: true },
    ]
  },
  {
    title: "POS Features",
    rows: [
      { feature: "Offer discounts (itemised and full bill)", Lite: true, Growth: true, Advanced: true },
      { feature: "Add or edit customer info", Lite: true, Growth: true, Advanced: true },
      { feature: "Manage and return items of stock", Lite: true, Growth: true, Advanced: true },
      { feature: "Pre-Order and pick up", Lite: true, Growth: true, Advanced: true },
      { feature: "Save, Hold, Split, Merge customer orders", Lite: true, Growth: true, Advanced: true },
        { feature: "Split, Cancel, Void, Refund transactions", Lite: true, Growth: true, Advanced: true },
      { feature: "Create additional payment options", Lite: true, Growth: true, Advanced: true },
        { feature: "Perform Pay Ins and Pay Outs", Lite: true, Growth: true, Advanced: true },
        { feature: "Print Shift reports", Lite: true, Growth: true, Advanced: true },
        { feature: "Automatic, Manual sync data", Lite: true, Growth: true, Advanced: true },
        { feature: "Sync multiple iPads within the same store", Lite: true, Growth: true, Advanced: true },
        { feature: "Offline mode", Lite: true, Growth: true, Advanced: true },
        { feature: "Check stock levels across multiple stores", Lite: true, Growth: true, Advanced: true },
        { feature: "Integrated Payments (DuitNow & GHL)", Lite: true, Growth: true, Advanced: true },
        { feature: "Marketplace Integration (with add-on subscription)", Lite: true, Growth: true, Advanced: true },
    ],
  },
  {
    title: "Employees",
    rows: [
      { feature: "Manage employee information & access", Lite: true, Growth: true, Advanced: true },
      { feature: "Track employee performance & work hours", Lite: true, Growth: true, Advanced: true },
      { feature: "Easy clock in and out", Lite: true, Growth: true, Advanced: true },
      { feature: "Open and close shift", Lite: true, Growth: true, Advanced: true },
    ]
  },
  {
    title: "Integrations",
    rows: [
      { feature: "QBO accounting software integration", Lite: true, Growth: true, Advanced: true },
    ]
  },
  {
    title: "Support",
    rows: [
      { feature: "Live Chat (7 days a week)", Lite: true, Growth: true, Advanced: true },
      { feature: "Workshops & Training", Lite: false, Growth: false, Advanced: true },
      { feature: "Dedicated Customer Success Manager", Lite: true, Growth: true, Advanced: true },
      { feature: "Priority Support", Lite: false, Growth: false, Advanced: true },
    ],
  },
];

const PricingTablesAccordion: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <div className="bg-white max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Explore and compare each plan in full</h2>

      {tableSections.map((section, index) => (
        <div key={index} className="mb-4 border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full text-left px-4 py-3 bg-gray-100 font-semibold text-lg hover:bg-gray-200 transition"
          >
            {section.title}
          </button>

          {openSection === section.title && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-t">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="p-3 border">Feature</th>
                    <th className="p-3 border text-center">Lite</th>
                    <th className="p-3 border text-center">Growth</th>
                    <th className="p-3 border text-center">Advanced</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3 border">{row.feature}</td>
                      <td className="p-3 border text-center">
                        {row.Lite ? <span className="text-green-500">✔</span> : "-"}
                      </td>
                      <td className="p-3 border text-center">
                        {row.Growth ? <span className="text-green-500">✔</span> : "-"}
                      </td>
                      <td className="p-3 border text-center">
                        {row.Advanced ? <span className="text-green-500">✔</span> : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingTablesAccordion;
