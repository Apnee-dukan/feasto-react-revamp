import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import RestaurantList from './components/RestaurantList';
import Footer from './components/Footer';
import ReturnPolicy from './components/ReturnPolicy';
import CookiePolicy from './components/CookiesPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Guidelines from './components/Guidelines';
import PrivacyPolicy from './components/PrivacyPolicy';
import Items from './components/Items';
import Cart from './components/Cart';
import ItemDetails from './components/ItemDetails';
import AccountDetails from './components/AccountDetails';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/items" element={<Items />} />
          <Route path="/returns" element={<ReturnPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/itemdetails" element={<ItemDetails />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/AccountDetails" element={<AccountDetails />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
