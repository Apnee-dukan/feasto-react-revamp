import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-primary">Cookies Policy</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2">What is a cookie?</h2>
      <p className="mb-4">
        A cookie is a small text file that is stored on your computer or other internet-connected device
        in order to identify your browser, provide analytics, and remember information about you such as
        your language preference or login information. They're completely safe and can't be used to run
        programs or deliver viruses to your device.
        <br />
        You can learn more about cookies by clicking{' '}
        <a
          href="https://www.allaboutcookies.org/"
          className="text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">What type of cookies does Feasto use?</h2>
      <p className="mb-4">
        Cookies can either be session cookies or persistent cookies. A session cookie expires
        automatically when you close your browser. A persistent cookie will remain until it expires or
        you delete your cookies. Expiration dates are set in the cookies themselves. Cookies placed by
        the website you’re visiting are called “first party cookies”.
      </p>
      <p className="mb-4">
        Below is a detailed list of the cookies we use on our website. Our website is scanned with our
        cookie scanning tool regularly to maintain a list as accurate as possible. We classify cookies in
        the following categories:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Cookies Categories</h2>
      <h3 className="text-xl font-semibold mt-4 mb-1">Strictly Necessary Cookies</h3>
      <p className="mb-4">
        These cookies are necessary for our website to function and cannot be switched off in our
        systems. They are essential in order to enable you to navigate around the website and use its
        features. If you remove or disable these cookies, we cannot guarantee that you will be able to use
        our websites.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-1">Analytics Cookies</h3>
      <p className="mb-4">
        Analytics cookies help us improve the way our websites work (e.g. by ensuring that users are
        finding what they are looking for easily). These cookies track information about visits to the
        websites so we can make improvements and report performance. For example, analyze visitor
        behavior and test new features/pages.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-1">Preference Cookies</h3>
      <p className="mb-4">
        Preference cookies are used to provide services or to remember choices you make so we can
        personalize content for you (e.g. remembering your username, language, or region). These
        preferences are remembered through persistent cookies.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Purpose & Cookies Name</h2>
      <div className="mb-4">
        <p className="mb-1 font-medium">Account & Session Management</p>
        <p className="text-sm text-gray-700">
          iambdt, iamadt, _iamtt, _imtrem, _z_identity, dcl_bd, dcl_pfx, dcl_pfx_lcnt, is_pfx
        </p>
      </div>

      <div className="mb-4">
        <p className="mb-1 font-medium">Application Deployment Management</p>
        <p className="text-sm text-gray-700">BuildCookie*, build_version</p>
      </div>

      <div className="mb-4">
        <p className="mb-1 font-medium">Security</p>
        <p className="text-sm text-gray-700">
          zbcscook, zsmcscook, zomcscook, zecscook, Other cookies (of the pattern *csr*)
        </p>
      </div>

      <div className="mb-4">
        <p className="mb-1 font-medium">Webpage Analytics</p>
        <p className="text-sm text-gray-700">
          ZohoBooksRef, ZohoInvoiceRef, ZInventoryRef, ZohoExpenseRef, ZohoFinancePlusRef,
          ZSubscriptionsRef, ZCheckoutRef, ZohoGSTFillingRef, ZohoBooksPageURL, ZohoInvoicePageURL,
          ZInventoryPageURL, ZohoExpensePageURL, ZohoFinancePlusPageURL, ZSubscriptionsPageURL,
          ZCheckoutPageURL, ZohoGSTFillingPageURL, ZFEdition
        </p>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How you can manage cookies?</h2>
      <p className="mb-4">
        Most browsers allow you to control cookies through their 'settings' preferences. However, if you
        limit the ability of websites to set cookies, you may worsen your overall user experience, since
        it will no longer be personalized. It may also prevent saving custom settings like login
        information.
      </p>
      <p className="mb-4">
        Browser manufacturers provide help pages for cookie management. Please refer to your browser's
        support for more information:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-700">
        <li>Google Chrome</li>
        <li>Internet Explorer</li>
        <li>Mozilla Firefox</li>
        <li>Safari (Desktop & Mobile)</li>
        <li>Android Browser</li>
        <li>Opera (Desktop & Mobile)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Disclaimer</h2>
      <p className="mb-4">
        We may update this Cookie Statement from time to time to reflect changes in cookies we use or for
        legal or operational reasons. Please check this page regularly to stay informed. For more
        information, contact us at{' '}
        <a
          href="mailto:privacy@Feasto.com"
          className="text-primary underline"
        >
          privacy@Feasto.com
        </a>.
      </p>
    </div>
  );
};

export default CookiePolicy;
