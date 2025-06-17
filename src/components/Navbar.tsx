
import React, { useState } from 'react';
import { Menu, X, MapPin, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-orange-600 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>Kuala Lumpur, Malaysia</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+60 3-1234 5678</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Open Daily: 11:00 AM - 10:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-orange-600">Feasto</h1>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#menu" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                Menu
              </a>
              <a href="#about" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">
                Order Now
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-900 hover:text-orange-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#menu" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                Menu
              </a>
              <a href="#about" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-900 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                Contact
              </a>
              <button className="w-full bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors mt-4">
                Order Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
