import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = ['restaurants', 'about', 'contact'];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-2">
          {/* Left Section: Logo */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              <img
                src="/dist/images/logo/logo-orange.png"
                alt="Feasto"
                style={{ height: '3rem' }}
              />
            </Link>
          </div>

          {/* Right Section: Nav + Cart + Login */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {/* Nav Links */}
            {NAV_ITEMS.map((id) => (
              <Link
                key={id}
                to={`/${id}`}
                className="text-gray-900 hover:text-orange-600 px-3 py-2 font-medium"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}

            {/* Cart Icon */}
            <ShoppingCartIcon />

            {/* Login Button */}
            <Button
              variant="ghost"
              onClick={() => setLoginModal(true)}
              className="flex items-center space-x-2"
            >
              <User size={16} />
              <span>Login</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-900 hover:text-orange-600 p-2"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Panel */}
        {open && (
          <div className="md:hidden bg-white border-t px-4 pb-4 space-y-4">
            {/* Nav Links */}
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((id) => (
                <Link
                  key={id}
                  to={`/${id}`}
                  onClick={() => setOpen(false)}
                  className="text-gray-900 hover:text-orange-600 text-base font-medium"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </Link>
              ))}
            </nav>

            {/* Login Button */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setLoginModal(true)}>
                Login
              </Button>
            </div>
          </div>
        )}
      </header>

      <LoginModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
    </>
  );
};

const ShoppingCartIcon = () => (
  <button className="relative p-2 text-gray-900 hover:text-orange-600">
    <ShoppingCart size={20} />
    <span className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
      0
    </span>
  </button>
);

export default Navbar;
