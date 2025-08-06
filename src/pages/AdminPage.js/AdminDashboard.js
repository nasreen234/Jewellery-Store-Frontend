import React, { useState } from 'react';
import ManageProducts from './ManageProducts';
import ManageUsers from './ManageUsers';
import ManageOrders from './ManageOrders';
import { motion } from 'framer-motion';
import { 
  FaBoxes, 
  FaUsers, 
  FaMoneyCheckAlt, 
  FaShoppingCart, 
  FaRupeeSign 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  
  const handleGoHome = () => {
    navigate('/');
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ManageProducts />;
      case 'users':
        return <ManageUsers />;
      case 'orders':
        return <div><ManageOrders/></div>;
    
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
  
<div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h3
          style={{
            marginBottom: '30px',
            textAlign: 'center',
            color: '#343a40',
            fontWeight: 'bold',
          }}
        >
          Admin Dashboard
        </h3>
      
        {/* ——— Analytics Summary Section ——— */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <SummaryCard icon={<FaUsers size={28} />} label="Users" value="1,200" bg="#c3e6cb" color="#155724" />
          <SummaryCard icon={<FaBoxes size={28} />} label="Products" value="480" bg="#bee5eb" color="#004085" />
          <SummaryCard icon={<FaShoppingCart size={28} />} label="Orders" value="320" bg="#ffeeba" color="#856404" />
          <SummaryCard icon={<FaRupeeSign size={28} />} label="Revenue" value="₹95,000" bg="#f5c6cb" color="#721c24" />
        </div>

        {/* ——— Tab Cards ——— */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <DashboardCard
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
            color="#ffcccc"
            textColor="#8b0000"
            icon={<FaBoxes size={28} />}
            label="Manage Products"
          />
          <DashboardCard
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
            color="#cce5ff"
            textColor="#004085"
            icon={<FaUsers size={28} />}
            label="Manage Users"
          />
          <DashboardCard
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
            color="#d4edda"
            textColor="#155724"
            icon={<FaMoneyCheckAlt size={28} />}
            label="Orders & Payments"
          />
          
        </div>
          <div>
 <button onClick={handleGoHome} className="btn btn-outline-primary mb-5">
    Go to Home
  </button>
  </div>

        {/* ——— Content Area ——— */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '20px',
            backgroundColor: '#f1f1f1',
            borderRadius: '10px',
            minHeight: '300px',
          }}
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Reusable summary card component

  const SummaryCard = ({ icon, label, value, bg, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{
      backgroundColor: bg,
      color,
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div style={{ marginBottom: '10px' }}>{icon}</div>
    <h4 style={{ margin: '0', fontSize: '1.5rem' }}>{value}</h4>
    <p style={{ margin: '5px 0 0' }}>{label}</p>
  </motion.div>
)

    

// Reusable tab card component
const DashboardCard = ({ active, onClick, color, textColor, icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      backgroundColor: active ? color : '#e0e0e0',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: active ? textColor : '#555',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    }}
  >
    <div style={{ marginBottom: '10px' }}>{icon}</div>
    {label}
  </motion.button>
  
   
);
 
export default AdminDashboard;
