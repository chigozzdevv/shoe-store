import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Cart from './components/cart/Cart';
import Checkout from './components/cart/Checkout';
import PaymentSuccess from './components/cart/PaymentSuccess';
import './App.css';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <AuthConsumer>
            {({ currentPage }) => (
              <>
                {currentPage !== 'dashboard' && (
                  <Navbar setShowCart={setShowCart} />
                )}
                
                <main className="flex-grow">
                  {currentPage === 'home' && <HomePage />}
                  {currentPage === 'login' && <LoginPage />}
                  {currentPage === 'dashboard' && <DashboardPage />}
                </main>
                
                {currentPage !== 'dashboard' && <Footer />}
                
                <Cart 
                  isOpen={showCart} 
                  setIsOpen={setShowCart} 
                  setShowCheckout={setShowCheckout} 
                />
                
                <Checkout 
                  isOpen={showCheckout} 
                  setIsOpen={setShowCheckout} 
                  setPaymentSuccess={setShowPaymentSuccess} 
                />
                
                <PaymentSuccess 
                  isOpen={showPaymentSuccess} 
                  setIsOpen={setShowPaymentSuccess} 
                />
              </>
            )}
          </AuthConsumer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

function AuthConsumer({ children }) {
  const authContext = useAuth();
  return children(authContext);
}

export default App;