import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = ({ setShowCart }) => {
  const { isLoggedIn, logout, setCurrentPage } = useAuth();
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <span className="text-xl font-bold">ShoeStore</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-700 focus:outline-none"
              onClick={() => setShowCart(true)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button 
                  className="bg-indigo-600 px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700 focus:outline-none"
                  onClick={() => setCurrentPage('dashboard')}
                >
                  Dashboard
                </button>
                <button 
                  className="bg-red-600 px-4 py-2 rounded text-sm font-medium hover:bg-red-700 focus:outline-none"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                className="bg-indigo-600 px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700 focus:outline-none"
                onClick={() => setCurrentPage('login')}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;