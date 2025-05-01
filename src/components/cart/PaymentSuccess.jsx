// src/components/cart/PaymentSuccess.jsx
import { useState } from 'react';

const PaymentSuccess = ({ isOpen, setIsOpen }) => {
  const [orderNumber] = useState(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // Delivery in 5 days
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-bold text-gray-900">Payment successful!</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Thank you for your purchase. We've sent a confirmation email with all the details of your order.
                </p>
              </div>
            </div>
            
            <div className="mt-6 border-t border-b border-gray-200 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Order Number:</span>
                <span className="text-sm font-bold text-gray-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Estimated Delivery:</span>
                <span className="text-sm font-bold text-gray-900">{estimatedDelivery}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">What's Next?</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-500">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  You'll receive an order confirmation email shortly
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  We'll notify you when your order ships
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  You can track your order in your account
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setIsOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;