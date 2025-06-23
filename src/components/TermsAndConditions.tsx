import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Banner with Background */}
      <div
        className="h-[250px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/dist/images/banner-static.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-4xl font-bold">
          Terms & Conditions
        </h1>
      </div>

      {/* Content */}
      <section className="px-4 md:px-10 py-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Terms of Use for Malaysia Feasto Customers</h2>
        <p className="mb-4">
          This document is an electronic record in terms of the Information Technology Act, 2000...
        </p>

        <p className="mb-4">
          These terms of use (“Terms of Use”) govern your use of our website www.feasto.com.my (“Website”)
          and our “Feasto” application (“App”). The Website and App are together called the “Platform”.
          Please read these Terms carefully before use. If you disagree, do not use the services and uninstall the App.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Amendments</h3>
        <p className="mb-4">
          These Terms are subject to modifications at any time. You are responsible for reviewing them regularly.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Use of Platform and Services</h3>
        <p className="mb-4">
          All commercial terms are between Buyers and Merchants. Feasto is not responsible for contractual arrangements
          but may offer support services for order fulfillment and payment collection.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Account Registration</h3>
        <p className="mb-4">
          You agree to pay all fees and applicable taxes. Failure to pay may result in access restrictions to your account.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Information Confidentiality</h3>
        <p className="mb-4">
          You are responsible for maintaining confidentiality of login details. Internet is not completely secure and we do not guarantee against interception.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Your Non-Transferable License</h3>
        <p className="mb-4">
          We grant you a non-transferable, non-exclusive license to use the services, which may be suspended or terminated under certain conditions.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Terminating Your Service</h3>
        <p className="mb-4">
          You may end your service by notifying Feasto in writing. No refund is provided for the unused portion of the service.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">General Practices Regarding Use</h3>
        <p className="mb-4">
          We may change or limit service features, disable inactive accounts, or log off users for maintenance.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Website and Publications</h3>
        <p className="mb-4">
          Content on our website may contain inaccuracies. Use of third-party links is at your own risk. Content provided is informational and not legal advice.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
