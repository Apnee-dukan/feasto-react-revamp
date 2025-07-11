
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const Footer = () => {
  const [loginModal, setLoginModal] = useState(false);
  return (
    <>
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Feasto</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Feasto is a full-fledged ecosystem which provides a seamless ordering experience in a restaurant. It consists of a web app that can be accessed via the QR codes at the restaurant & a software to accommodate the in-house system.
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
              <li><span onClick={() => window.location.href = "https://feasto.com.my/web/login"} style={{cursor: 'pointer'}} className="text-gray-400 hover:text-orange-600 transition-colors">Register Merchant</span></li>
              <li><span onClick={() => window.location.href = "https://feasto.com.my/web/register"} style={{cursor: 'pointer'}} className="text-gray-400 hover:text-orange-600 transition-colors">Merchant Login</span></li>
              <li><Link to="#" className="text-gray-400 hover:text-orange-600 transition-colors">Feedback</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orange-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/guidelines" className="text-gray-400 hover:text-orange-600 transition-colors">Business Owner Guidelines</Link></li>
            </ul>
          </div>

          {/* Menu categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-orange-600 transition-colors">About us</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-orange-600 transition-colors">Refund & Cancellation</Link></li>
              <li><Link to="/policy" className="text-gray-400 hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/termsandconditions" className="text-gray-400 hover:text-orange-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-orange-600 transition-colors">Cookies Policy</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={35} className="text-orange-600 mt-1" />
                <div className="text-gray-400">
                  <p>Block C, Level 3, Unit 30,
     Oasis Corporate Park - Centum,
     Jalan Pju 1a/2</p>
                  <p>Ara Damansara,
     47301 Petaling Jaya, Selangor
     Malaysia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-600" />
                <span className="text-gray-400">+60 16-321 6306</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-orange-600" />
                <span className="text-gray-400">info@feasto.com.my</span>
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
              <Link to="/policy" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/termsandconditions" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <LoginModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
  </>
  );
};

export default Footer;
