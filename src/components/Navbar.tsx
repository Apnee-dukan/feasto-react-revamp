import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  ShoppingCart,
  User,
  ChevronDown,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = ['pricing', 'restaurants', 'about', 'contact'];

const FEATURES_DROPDOWN = [
  { label: 'Point of Sale', path: '/point-of-sale' },
  { label: 'Inventory Management', path: '/inventory-management' },
  { label: 'Report & Analytics', path: '/report-analytics' },
  { label: 'Loyalty Program & Membership', path: '/loyalty-program-membership' },
  { label: 'E-Invoicing', path: '/e-invoicing' },
  { label: 'Hardware', path: '/hardware' },
  { label: 'Marketplace Integration', path: '/marketplace-integration' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [featuresDropdown, setFeaturesDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('userDetails');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              <img
                src="/dist/images/logo/logo-orange.png"
                alt="Feasto"
                style={{ height: '3rem' }}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {/* Features Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setFeaturesDropdown(!featuresDropdown)}
                className="flex items-center space-x-1 text-gray-900 hover:text-orange-600 font-medium"
              >
                <span>Features</span>
                <ChevronDown size={16} />
              </button>
              {featuresDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded shadow-md z-20">
                  {FEATURES_DROPDOWN.map(({ label, path }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setFeaturesDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Nav Links */}
            {NAV_ITEMS.map((id) => (
              <Link
                key={id}
                to={`/${id}`}
                className="text-gray-900 hover:text-orange-600 px-3 py-2 font-medium capitalize"
              >
                {id}
              </Link>
            ))}

            {/* Cart Icon */}
            <ShoppingCartIcon />

            {/* Login/User Dropdown */}
            {user ? (
              <div className="relative">
                <Button variant="ghost" onClick={() => setUserDropdown(!userDropdown)}>
                  <User size={16} /> {user.name}
                </Button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                    <Link
                      to="/AccountDetails"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account Details
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setLoginModal(true)}
                className="flex items-center space-x-2"
              >
                <User size={16} />
                <span>Login</span>
              </Button>
            )}
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

        {/* Mobile Nav Panel */}
        {open && (
          <div className="md:hidden bg-white border-t px-4 pb-4 space-y-4">
            {/* Features Collapsible Dropdown */}
            <div>
              <button
                className="flex justify-between items-center w-full text-left text-gray-900 hover:text-orange-600 text-base font-medium"
                onClick={() => setFeaturesDropdown(!featuresDropdown)}
              >
                <span>Features</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    featuresDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {featuresDropdown && (
                <div className="mt-2 pl-4 space-y-2">
                  {FEATURES_DROPDOWN.map(({ label, path }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => {
                        setOpen(false);
                        setFeaturesDropdown(false);
                      }}
                      className="block text-sm text-gray-700 hover:text-orange-600"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {NAV_ITEMS.map((id) => (
              <Link
                key={id}
                to={`/${id}`}
                onClick={() => setOpen(false)}
                className="block text-gray-900 hover:text-orange-600 text-base font-medium capitalize"
              >
                {id}
              </Link>
            ))}

            {/* Login */}
            {!user && (
              <Button variant="ghost" onClick={() => setLoginModal(true)}>
                Login
              </Button>
            )}
          </div>
        )}
      </header>

      <LoginModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
    </>
  );
};

// Shopping Cart Component
const ShoppingCartIcon = () => {
  const count = localStorage.getItem('no_of_cart_items') || '0';
  return (
    <Link to="/cart" className="relative p-2 text-gray-900 hover:text-orange-600">
      <ShoppingCart size={20} />
      <span className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
        {count}
      </span>
    </Link>
  );
};

export default Navbar;
