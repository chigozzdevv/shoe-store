// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import Cart from './components/cart/Cart';
import Checkout from './components/cart/Checkout';
import PaymentSuccess from './components/cart/PaymentSuccess';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
  // Add this effect to prevent body scrolling when modals are open
  useEffect(() => {
    if (showCart || showCheckout || showPaymentSuccess) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showCart, showCheckout, showPaymentSuccess]);
  
  // This function ensures only one modal is open at a time
  const handleOpenCart = () => {
    setShowCheckout(false);
    setShowPaymentSuccess(false);
    setShowCart(true);
  };
  
  const handleProceedToCheckout = () => {
    setShowCart(false);
    setShowPaymentSuccess(false);
    setShowCheckout(true);
  };
  
  const handlePaymentSuccess = () => {
    setShowCart(false);
    setShowCheckout(false);
    setShowPaymentSuccess(true);
  };
  
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <AuthConsumer>
              {({ currentPage }) => (
                <>
                  {currentPage !== 'dashboard' && (
                    <Navbar openCart={handleOpenCart} />
                  )}
                  
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                    </Routes>
                  </main>
                  
                  {currentPage !== 'dashboard' && <Footer />}
                  
                  {/* Ensure modal management is handled properly */}
                  {showCart && (
                    <Cart 
                      isOpen={showCart} 
                      setIsOpen={setShowCart} 
                      proceedToCheckout={handleProceedToCheckout}
                    />
                  )}
                  
                  {showCheckout && (
                    <Checkout 
                      isOpen={showCheckout} 
                      setIsOpen={setShowCheckout}
                      setPaymentSuccess={handlePaymentSuccess}
                    />
                  )}
                  
                  {showPaymentSuccess && (
                    <PaymentSuccess 
                      isOpen={showPaymentSuccess} 
                      setIsOpen={setShowPaymentSuccess}
                    />
                  )}
                </>
              )}
            </AuthConsumer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

// This is a simple component to consume AuthContext
function AuthConsumer({ children }) {
  const authContext = useAuth();
  return children(authContext);
}

export default App;