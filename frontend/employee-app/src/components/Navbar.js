import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Home, LayoutDashboard, LogOut, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-200">
                <span className="text-white text-xl font-bold">E</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">EMS</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link to="/" className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg backdrop-blur-sm transition-all duration-200">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg backdrop-blur-sm transition-all duration-200">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg backdrop-blur-sm transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg backdrop-blur-sm transition-all duration-200">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link to="/signup" className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-md">
                  <User className="w-4 h-4 mr-2" />
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 bg-opacity-95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link to="/" 
                  className="flex items-center px-4 py-3 text-base font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Link>
                <Link to="/dashboard"
                  className="flex items-center px-4 py-3 text-base font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="flex items-center px-4 py-3 text-base font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Login
                </Link>
                <Link to="/signup"
                  className="flex items-center px-4 py-3 m-2 text-base font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-3" />
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;