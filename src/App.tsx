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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/items" element={<Items />} />
          <Route path="/returns" element={<ReturnPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
