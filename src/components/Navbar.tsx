import React, { useState } from 'react';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NAV_ITEMS = ['restaurants', 'about', 'contact'];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [q, setQ] = useState('');

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between py-2">
          {/* Left Section: Logo */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              Feasto
            </Link>
          </div>

          {/* Search - Desktop */}
          <div className="hidden lg:flex items-center flex-grow max-w-md mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search restaurants..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map((id) => (
              <Link
                key={id}
                to={`/${id}`}
                className="text-gray-900 hover:text-orange-600 px-3 py-2 font-medium"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Login/Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <ShoppingCartIcon />
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
            {/* Search on mobile */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>

            {/* Links */}
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

            {/* Login + Order Now */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setLoginModal(true)}>
                Login
              </Button>
              {/* <Button className="bg-orange-600 text-white px-4 py-2 rounded-full">
                Order Now
              </Button> */}
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
