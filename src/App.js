import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminPage.js/AdminDashboard';
import Home from './pages/Home';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProtectedRoute from './components/ProtectedRoute';
import ManageProducts from './pages/AdminPage.js/ManageProducts';
import ManageUsers from './pages/AdminPage.js/ManageUsers';
import CategoryProduct from './pages/CategoryProduct';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import './App.css';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './pages/SearchResults';
import EditProfile from './pages/EditProfile';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ManageOrders from './pages/AdminPage.js/ManageOrders';
import MyOrdersPage from './pages/MyOrdersPage';
import Contactus from './components/Conatctus';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = (decodedPayload.exp - currentTime) * 1000;

        if (timeLeft <= 0) {
          // Already expired
          localStorage.clear();
          alert('Session expired. Please log in again.');
          navigate('/login');
        } else {
          // Set auto logout when token expires
          const timeout = setTimeout(() => {
            localStorage.clear();
            alert('Session expired. Please log in again.');
            navigate('/login');
          }, timeLeft);

          return () => clearTimeout(timeout); // Cleanup on unmount
        }
      } catch (err) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <CartProvider>
      <Routes>
        <Route path="/edit-profile" element={<ProtectedRoute role="user"><EditProfile /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/manage-products" element={<ProtectedRoute role="admin"><ManageProducts /></ProtectedRoute>} />
        <Route path="/admin/manage-users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />
        <Route path="/admin/manage-orders" element={<ProtectedRoute role="admin"><ManageOrders /></ProtectedRoute>} />
        
        <Route path="/" element={<Home />} />
        <Route path="/category-products" element={<CategoryProduct />} />
        <Route path="/product/:id" element={<ProductDetailPage />}/>
        <Route path="/cart" element={<ProtectedRoute role="user"><CartPage /></ProtectedRoute>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/place-order" element={<ProtectedRoute role="user"><PlaceOrderPage /></ProtectedRoute>} />
        <Route path="/order-success" element={<ProtectedRoute role="user"><OrderSuccessPage /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute role="user"><MyOrdersPage /></ProtectedRoute>} />
        <Route path="/contact" element={<Contactus />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </CartProvider>
  );
}

export default App;
