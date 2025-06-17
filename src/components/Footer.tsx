
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Feasto</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Serving authentic Malaysian cuisine since 2003. Experience the rich flavors 
              and traditional cooking methods that make our dishes truly special.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-orange-600 transition-colors">Home</a></li>
              <li><a href="#menu" className="text-gray-400 hover:text-orange-600 transition-colors">Menu</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-orange-600 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-orange-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Reservations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Private Events</a></li>
            </ul>
          </div>

          {/* Menu categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Menu</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Rice Dishes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Noodles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Curries</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Grilled Items</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Desserts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">Beverages</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-orange-600 mt-1" />
                <div className="text-gray-400">
                  <p>123 Jalan Bukit Bintang</p>
                  <p>50200 Kuala Lumpur, Malaysia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-600" />
                <span className="text-gray-400">+60 3-1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-orange-600" />
                <span className="text-gray-400">info@feasto.com.my</span>
              </div>
            </div>

            {/* Opening hours */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Opening Hours</h5>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Feasto Restaurant. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
