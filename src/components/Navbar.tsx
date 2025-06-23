
import React, { useState } from 'react';
import { Menu, X, MapPin, Phone, User, ShoppingCart, Search } from 'lucide-react';
import LoginModal from './LoginModal';
import LocationPicker from './LocationPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        {/* Main navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600">Feasto</h1>
            </div>

            {/* Search bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                <a href="/home" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#restaurants" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                  Restaurants
                </a>
                <a href="#menu" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                  Menu
                </a>
                <a href="#offers" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                  Offers
                </a>
                <a href="#about" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                  About
                </a>
                <a href="#contact" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                  Contact
                </a>
                
                {/* Cart Icon */}
                <button className="relative p-2 text-gray-900 hover:text-orange-600 transition-colors">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </button>

                {/* Login/Profile */}
                <Button
                  variant="ghost"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 text-gray-900 hover:text-orange-600"
                >
                  <User size={16} />
                  <span>Login</span>
                </Button>

                <Button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">
                  Order Now
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button className="relative p-2 text-gray-900 hover:text-orange-600 transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  0
                </span>
              </button>
              <button
                onClick={toggleMenu}
                className="text-gray-900 hover:text-orange-600 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#home" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                  Home
                </a>
                <a href="#restaurants" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                  Restaurants
                </a>
                <a href="#menu" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                  Menu
                </a>
                <a href="#offers" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                  Offers
                </a>
                <a href="#about" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                  About
                </a>
                <a href="#contact" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                  Contact
                </a>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full text-left text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium"
                >
                  Login / Sign Up
                </button>
                <button className="w-full bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors mt-4">
                  Order Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
