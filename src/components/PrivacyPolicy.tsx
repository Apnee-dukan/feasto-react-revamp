import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="text-gray-800">
      {/* Banner Section (optional image) */}
      <div
  className="h-[250px] bg-cover bg-center flex items-center justify-center relative"
  style={{ backgroundImage: "url('/public/dist/images/banner-static.jpg')" }} // Use your actual image path
>
  <div className="absolute inset-0 bg-black/50"></div>
  <h1 className="relative z-10 text-white text-3xl md:text-4xl font-bold">Privacy Policy</h1>
</div>

      {/* Policy Content */}
      <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto space-y-10 leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Feasto </span>Privacy of Use
          </h2>
          <p>
            This Privacy Policy (“Policy”) describes the policies and procedures on the collection,
            use, disclosure and protection of your information when you use our website located at
            feasto.com, or the Feasto mobile application (collectively, “Feasto Platform”) made
            available by Bundl Technologies Private Limited (“Feasto”, “Company”, “we”, “us” and
            “our”), a private company established under the laws of India having its registered
            office at Tower D, 9th Floor, IBC Knowledge Park, Bannerghatta Road, Bangalore – 560029.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Basic </span>Terms
          </h2>
          <p>
            The terms “you” and “your” refer to the user of the Feasto Platform. The term “Services”
            refers to any services offered by Feasto whether on the Feasto Platform or otherwise.
            <br /><br />
            Please read this Policy before using the Feasto Platform or submitting any personal
            information to Feasto. This Policy is a part of and incorporated within, and is to be
            read along with, the Terms of Use.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Your </span>Consent
          </h2>
          <p>
            By using the Feasto Platform and the Services, you agree and consent to the collection,
            transfer, use, storage, disclosure and sharing of your information as described in this
            Policy. If you do not agree with the Policy, please do not use or access the Feasto
            Platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Policy </span>Changes
          </h2>
          <p>
            We may occasionally update this Policy and such changes will be posted on this page. If
            we make any significant changes to this Policy, we will provide you with reasonable
            notice such as via prominent notices on the Feasto Platform or your registered email.
            Your continued use of our Services after such changes constitutes your consent to the
            updated Policy.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Links </span>To Other Websites
          </h2>
          <p>
            The Feasto Platform may contain links to other websites. Any personal information
            collected while visiting those websites is not governed by this Policy. Feasto is not
            responsible for and has no control over the practices or content of those sites.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Information </span>We Collect From You
          </h2>
          <p>
            <strong>Information you give us:</strong> Name, email, phone number, password, address,
            payment info, DOB, profile picture, reviews, order details, favorites, merchant requests,
            and referred contacts. <br /><br />
            <strong>Information we collect automatically:</strong> When using our services, we may
            collect and store data like phone number, address, email, billing info, and preferences to
            process your requests faster. Also includes support interactions, form completions, and
            feature usage.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Cookies</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Authenticating users</li>
            <li>Remembering preferences/settings</li>
            <li>Measuring content popularity</li>
            <li>Ad campaign delivery & performance</li>
            <li>Traffic and trend analysis</li>
            <li>Understanding user behavior</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Uses Of Your </span>Information
          </h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide and improve our services</li>
            <li>Fulfill obligations from any contracts</li>
            <li>Maintain security of the platform</li>
            <li>Send marketing and service communications</li>
            <li>Understand user behavior and improve content</li>
            <li>Respond to your queries and provide support</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Disclosure </span>Of Your Information
          </h2>
          <p>
            We may share your data with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Vendors and service providers</li>
            <li>Marketing and analytics partners</li>
            <li>Other users (e.g., delivery details)</li>
            <li>Law enforcement or government agencies</li>
            <li>For fraud detection, identity verification, and legal obligations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-primary">Data </span>Security Precautions
          </h2>
          <p>
            We use vault and tokenization services (PCI compliant) for sensitive info. Please avoid
            sharing full card details via unencrypted platforms. You’re responsible for securing your
            account credentials. Though we follow strict security protocols, transmission over the
            internet may still be vulnerable.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-primary">OPT-OUT</h2>
          <p>
            When you sign up, you opt-in to receive Feasto emails. You can manage preferences or
            unsubscribe, except for important service notices. To withdraw consent for data use,
            write to us at <span className="text-gray-900 font-medium">[email]</span>. Processing
            may take up to 5 business days. Some services may become unavailable post withdrawal.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
