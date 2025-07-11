import React, { useState, useEffect } from "react";
import {
  MapPin,
  Coffee,
  CreditCard,
  Utensils,
  User,
  QrCode,
  Download,
  CloudDownload 
} from "lucide-react";
declare global {
  interface Window {
    google?: any;
  }
}

const Home = () => {
//   const history = useHistory();
  const [searchVl, setSearchVl] = useState("");
  const [currentPlace, setCurrentPlace] = useState("");

  useEffect(() => {
    if (!window.google?.maps) {
      // const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const API_KEY = 'AIzaSyAeTX1XOX-SiE6XMIePIF6sXsTfTnAx3SQ';
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&v=weekly`;
      script.async = true;
      script.onload = loadCurrentLocation;
      document.body.appendChild(script);
    } else {
      loadCurrentLocation();
    }
  }, []);

  const loadCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const google = window.google;
      const geocoder = new google.maps.Geocoder();
      const latLng = { lat: latitude, lng: longitude };

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const locality = results[0].address_components.find(comp =>
            comp.types.includes("locality")
          );
          if (locality) {
            setCurrentPlace(`feasto ${locality.long_name}`);
          }
        }
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // history.push("/restaurant_details", { srvalue: searchVl });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Indulge your tastebuds with {" "}
          <span className="text-orange-600">{currentPlace}</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Our Dine‑In service makes it easier for you to enjoy your favorite cuisines
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <input
            type="text"
            name="location"
            placeholder="Search your city"
            className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="text"
            name="searchvl"
            value={searchVl}
            onChange={(e) => setSearchVl(e.target.value)}
            placeholder="Search your favorite food"
            className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Go To Menu
          </button>
        </form>
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

      {/* App Download */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
          <div className="space-y-6 flex-1">
            <AppFeatureList
              icon={<User size={32} />}
              title="Register / Login"
              description="Customer can create an account & login to place an order"
            />
            <AppFeatureList
              icon={<MapPin size={32} />}
              title="Location"
              description="Enter your location to choose the menu"
            />
            <AppFeatureList
              icon={<Coffee size={32} />}
              title="Menu Listing"
              description="See the list of all menu items"
            />
            <AppFeatureList
              icon={<Download size={32} />}
              title={"Download Android App"}
              description={"Download the Feasto app from Google Play Store"}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/public/dist/images/ph.jpg"
              alt="Feasto App"
              className="max-w-xs"
            />
          </div>
          <div className="space-y-6 flex-1">
            <AppFeatureList
              icon={<QrCode size={32} />}
              title="Scan"
              description="Scan QR Code placed on the table / room / sun bed"
            />
            <AppFeatureList
              icon={<CreditCard size={32} />}
              title="Pay"
              description="Pay for your order securely on your phone"
            />
            <AppFeatureList
              icon={<Utensils size={32} />}
              title="Enjoy"
              description="Enjoy Dine‑In service seamlessly"
            />
            <AppFeatureList
              icon={<CloudDownload size={32} />}
              title={"Download IOS App"}
              description={"Download the Feasto app from Apple App Store"}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12">
        <div className="max-w-xl mx-auto bg-white border rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-semibold text-center text-orange-600 mb-6">
            Subscribe to Our Newsletter
          </h3>
          <form className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1">
              <label htmlFor="news-name" className="block mb-1 font-medium">
                Name
              </label>
              <input
                id="news-name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="news-email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                id="news-email"
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export const FeatureCard = ({ icon, title, children }) => (
  <div className="p-6 bg-white rounded-lg text-center shadow-sm">
    <div className="w-16 h-16 mx-auto mb-4 text-orange-600">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const AppFeatureList = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 text-orange-600">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Home;
