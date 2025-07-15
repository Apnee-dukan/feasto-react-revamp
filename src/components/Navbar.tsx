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

const Navbar = ({ cartItems }) => {
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

  const toggleMobileMenu = () => {
    setOpen(!open);
    setFeaturesDropdown(false);
    setUserDropdown(false);
  };

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/dist/images/logo/logo-orange.png"
              alt="Feasto"
              className="h-10"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFeaturesDropdown(!featuresDropdown);
                  setUserDropdown(false);
                }}
                className="flex items-center gap-1 text-gray-800 hover:text-orange-600 font-medium"
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

            {/* Nav Items */}
            {NAV_ITEMS.map((id) => (
              <Link
                key={id}
                to={`/${id}`}
                className="text-gray-800 hover:text-orange-600 font-medium capitalize"
              >
                {id}
              </Link>
            ))}

            {/* Cart */}
            <ShoppingCartIcon cartItems={cartItems} />

            {/* User/Login */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setUserDropdown(!userDropdown);
                    setFeaturesDropdown(false);
                  }}
                >
                  <User size={16} />
                  <span className="ml-1">{user.name}</span>
                </Button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-20">
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
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-800 p-2">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="md:hidden bg-white border-t px-4 pb-4 space-y-4">
            {/* Features */}
            <div>
              <button
                className="flex justify-between items-center w-full text-left text-gray-900 font-medium"
                onClick={() => {
                  setFeaturesDropdown(!featuresDropdown);
                  setUserDropdown(false);
                }}
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
                <div className="mt-2 pl-4 space-y-1">
                  {FEATURES_DROPDOWN.map(({ label, path }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700 hover:text-orange-600"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav Items */}
            {NAV_ITEMS.map((id) => (
              <Link
                key={id}
                to={`/${id}`}
                onClick={toggleMobileMenu}
                className="block text-gray-900 font-medium capitalize hover:text-orange-600"
              >
                {id}
              </Link>
            ))}

            {/* Cart */}
            <div>
              <ShoppingCartIcon cartItems={cartItems} />
            </div>

            {/* User/Login */}
            {user ? (
              <div>
                <button
                  className="flex items-center gap-2 text-gray-900 font-medium"
                  onClick={() => {
                    setUserDropdown(!userDropdown);
                    setFeaturesDropdown(false);
                  }}
                >
                  <User size={16} />
                  <span>{user.name}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      userDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {userDropdown && (
                  <div className="mt-2 pl-4 space-y-1">
                    <Link
                      to="/AccountDetails"
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700 hover:text-orange-600"
                    >
                      Account Details
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="text-left w-full text-sm text-gray-700 hover:text-orange-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="ghost" onClick={() => setLoginModal(true)}>
                <User size={16} />
                <span className="ml-2">Login</span>
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
    </>
  );
};

const ShoppingCartIcon = ({ cartItems }) => {
  const count = localStorage.getItem('no_of_cart_items') || '0';
  return (
    <Link to="/cart" className="relative inline-block text-gray-800 hover:text-orange-600">
      <ShoppingCart size={22} />
      <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartItems || count}
      </span>
    </Link>
  );
};

export default Navbar;
