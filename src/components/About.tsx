import React from 'react';

const About = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-[350px] flex items-center justify-center relative"
        style={{ backgroundImage: "url('/dist/images/banner-about.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <p className="text-lg uppercase tracking-wide">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Never have a bad food</h2>
        </div>
      </div>

      {/* About Content */}
      <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
        {/* Who Are We */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              <span className="text-primary">Who </span> Are We
            </h2>
            <p className="leading-relaxed">
              Feasto is a full-fledged ecosystem which provides a seamless ordering experience in a restaurant.
              Our platform consists of a food app that can be downloaded from the App Store & software to
              accommodate the in-house operations of the restaurant.
              <br /><br />
              The consumer app is used to order a desired meal from the menu in a restaurant or dining place,
              and customers will be able to pay upon serving. On the other side, sophisticated software is
              provided for the restaurant owner, ranging from menu input to automated auditing.
              <br /><br />
              Additionally, Feasto provides kitchen-side software where staff can prepare meals according to
              orders. The software includes an inbuilt POS system for effortless customer order management.
            </p>
          </div>
          <div>
            <img src="/dist/images/who.jpg" alt="Who We Are" className="rounded-xl shadow-md w-full" />
          </div>
        </div>

        {/* Our Vision */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            <span className="text-primary">Our </span> Vision
          </h2>
          <p className="leading-relaxed">
            The idea of Feasto was aroused from the complications caused by the global pandemic. Feasto aimed
            to ease the burden on businesses and ensure safety. So, Appvention Mediatech (Developers of Feasto)
            came up with a one-stop solution for the dine-in ecosystem.
            <br /><br />
            Through Feasto, customers reduce prolonged contact with restaurant waiters by scanning a QR code
            and ordering from their phones—maintaining social distancing.
            <br /><br />
            Businesses in the dine-in industry can maintain cash flow efficiently with minimal manpower by
            using Feasto's solution.
            <br /><br />
            Customers can download the app from the App Store and Play Store. They can scan the QR code at
            their table, place their order, and pay digitally—without approaching the cashier counter.
          </p>
        </div>

        {/* Product List */}
        <div>
          <p className="leading-relaxed">
            Restaurant owners will have access to a wide range of Feasto products which will allow them to run
            operations smoothly. Feasto provides the following tools:
            <br /><br />
            1. Feasto POS<br />
            2. Feasto Restaurant Admin<br />
            3. Feasto KDS App<br />
            4. Feasto Waiter App<br /><br />
            Through these products, restaurant owners can manage operations, employees, and reports efficiently,
            making auditing and administration much easier.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;