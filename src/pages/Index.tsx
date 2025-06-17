
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RestaurantList from '../components/RestaurantList';
import FeaturedMenu from '../components/FeaturedMenu';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <RestaurantList />
      <FeaturedMenu />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
