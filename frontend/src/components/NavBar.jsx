import React from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logOut } from "../features/auth/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // This is the "Listener". When user becomes null, the UI swaps.
  const { user } = useSelector((state) => state.auth);
  
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      // Fallback: clear local state even if server is down
      dispatch(logOut());
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ServiceHub
            </span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            {/* Conditional Rendering starts here */}
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;