import { Routes, Route } from 'react-router';
import { useEffect, useState, } from 'react';
import axios from 'axios';
import { HomePage } from './pages/Home/HomePage';
import { CheckoutPage } from './pages/Checkout/CheckoutPage';
import { OrdersPage } from './pages/Orders/OrdersPage';
import { TrackingPage } from './pages/Tracking/TrackingPage';
import { NotFoundPage } from './pages/Error/NotFoundPage';
import { AuthPage } from './pages/Auth/AuthPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css'


function App() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCartItems(response.data);
  };

  useEffect(() => {
    const fetchitems = () => {
      loadCart();
    }
    fetchitems();
  }, []);


  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path="home" element={<HomePage cartItems={cartItems} loadCart={loadCart} />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="checkout" element={<ProtectedRoute><CheckoutPage cartItems={cartItems} loadCart={loadCart} /></ProtectedRoute>} />
      <Route path="orders" element={<ProtectedRoute><OrdersPage cartItems={cartItems} loadCart={loadCart} /></ProtectedRoute>} />
      <Route path="tracking/:orderId/:productId" element={<ProtectedRoute><TrackingPage cartItems={cartItems} /></ProtectedRoute>} />
      <Route path="*" element={< NotFoundPage />} />
    </Routes>
  )
}

export default App
