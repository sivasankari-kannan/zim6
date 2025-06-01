import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const isActive = (path: string) => location.pathname === path;

  // Define navigation items based on user role
  const getNavigationItems = () => {
    if (!user) return [];

    if (user.role === 'admin') {
      return [
        { path: '/admin', label: 'Dashboard' },
        { path: '/admin/gym-owners', label: 'Gym Owners' }
      ];
    }

    return [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/members', label: 'Members' },
      { path: '/memberships', label: 'Memberships' },
      { path: '/attendance', label: 'Attendance' }
    ];
  };

  const navigationItems = getNavigationItems();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">ZIM</span>
            </Link>
            
            {/* Desktop Navigation */}
            {user && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive(item.path) 
                        ? 'border-primary-500 text-dark-900' 
                        : 'border-transparent text-dark-500 hover:text-dark-700 hover:border-dark-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                <button className="p-1.5 rounded-full text-dark-500 hover:bg-gray-100">
                  <Bell size={20} />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={toggleProfile}
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-expanded={isProfileOpen ? 'true' : 'false'}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0EA5E9&color=fff`}
                        alt={user.name}
                      />
                    </button>
                  </div>
                  
                  {isProfileOpen && (
                    <div 
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
                    >
                      <div className="px-4 py-3">
                        <p className="text-sm">Signed in as</p>
                        <p className="text-sm font-medium text-dark-900 truncate">{user.email}</p>
                      </div>
                      <div className="border-t border-gray-200">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-dark-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Your Profile
                        </Link>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-dark-700 hover:bg-gray-100"
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button 
                    variant="ghost" 
                    className="ml-2"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="primary" 
                    className="ml-2"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-dark-500 hover:text-dark-900 hover:bg-gray-100 focus:outline-none"
                aria-expanded={isMenuOpen ? 'true' : 'false'}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {user && isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 animate-slide-down">
          <div className="pt-2 pb-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(item.path)
                    ? 'border-primary-500 text-primary-700 bg-primary-50'
                    : 'border-transparent text-dark-500 hover:bg-gray-50 hover:border-gray-300 hover:text-dark-700'
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;