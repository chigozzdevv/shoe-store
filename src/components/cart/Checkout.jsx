// src/components/cart/Checkout.jsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useShoeStore } from '../../data/shoesData';

const Checkout = ({ isOpen, setIsOpen, setPaymentSuccess }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { updateQuantity } = useShoeStore();
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  
  if (!isOpen) return null;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    return newErrors;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
      newErrors.cardNumber = 'Card number must be 16 digits';
    
    if (!formData.expDate) newErrors.expDate = 'Expiration date is required';
    else if (!/^\d{2}\/\d{2}$/.test(formData.expDate)) 
      newErrors.expDate = 'Format must be MM/YY';
    
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(formData.cvv)) 
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    
    return newErrors;
  };
  
  const handleNextStep = (e) => {
    e.preventDefault();
    
    const validationErrors = validateStep1();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setCurrentStep(2);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing with a slight delay
    setTimeout(() => {
      try {
        // Update inventory quantities for each item in the cart
        cartItems.forEach(item => {
          updateQuantity(item.id, item.size, item.quantity);
        });
        
        // Clear the cart and close checkout
        clearCart();
        setIsOpen(false);
        setPaymentSuccess(true);
      } catch (error) {
        console.error("Error processing order:", error);
        alert("There was a problem completing your order. Please try again.");
      } finally {
        setIsProcessing(false);
        setCurrentStep(1);
        
        // Reset form
        setFormData({
          email: '',
          fullName: '',
          address: '',
          city: '',
          zipCode: '',
          cardNumber: '',
          expDate: '',
          cvv: ''
        });
      }
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 overflow-y-auto z-[9999] pointer-events-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full max-w-md relative z-[10000] pointer-events-auto">
          <div className="flex items-center justify-between bg-gray-100 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Checkout</h2>
            <button 
              className="text-gray-500 hover:text-gray-700 focus:outline-none z-[10001]"
              onClick={() => setIsOpen(false)}
              disabled={isProcessing}
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="px-6 py-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">ORDER SUMMARY</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {currentStep === 1 ? (
              <div>
                <h3 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">CONTACT INFORMATION</h3>
                <form onSubmit={handleNextStep} className="z-[10001]">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className={`w-full px-3 py-2 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-[10001]"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">PAYMENT INFORMATION</h3>
                <form onSubmit={handleSubmit} className="z-[10001]">
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration date</label>
                      <input
                        type="text"
                        id="expDate"
                        name="expDate"
                        className={`w-full px-3 py-2 border ${errors.expDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                        placeholder="MM/YY"
                        value={formData.expDate}
                        onChange={handleChange}
                      />
                      {errors.expDate && <p className="mt-1 text-sm text-red-500">{errors.expDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className={`w-full px-3 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-[10001]`}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                      {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 z-[10001]"
                      onClick={handlePreviousStep}
                      disabled={isProcessing}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 z-[10001]"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        'Complete Purchase'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;