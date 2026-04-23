import React, { useState } from "react"; // Added useState
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logOut } from "../features/auth/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  
  const { user } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      setIsOpen(false); // Close menu on logout
      navigate("/");
    } catch (err) {
      dispatch(logOut());
      setIsOpen(false);
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ServiceHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Dashboard
                </Link>
                <div className="h-4 w-[1px] bg-gray-200"></div>
                <span className="text-sm text-gray-500 italic">Hi, {user.name || 'User'}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-5 py-2 rounded-full font-medium hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/register" className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Register
                </Link>
                <Link 
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4 shadow-xl">
            {user ? (
              <>
                <div className="block px-3 py-2 text-sm text-gray-500 border-b border-gray-50">
                  Logged in as: <span className="font-bold text-blue-600">{user.name}</span>
                </div>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600"
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-md"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;