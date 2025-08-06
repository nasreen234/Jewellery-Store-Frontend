import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; 

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from?.pathname || '/';
  const { clearCart } = useCart(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin
      ? 'https://jewellery-store-one.vercel.app/api/users/login'
      : 'https://jewellery-store-one.vercel.app/api/users/register';

    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token, name: userName, isAdmin } = res.data;

      // Clear cart from previous user
      localStorage.removeItem('cart');
      clearCart(); 
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail',email)
      localStorage.setItem('isAdmin', isAdmin);
      if (isLogin) {
        if (isAdmin) {
          alert('Admin logged in successfully');
        } else {
          alert('User logged in successfully');
        }
      } else {
        alert('Registration successful');
      }


      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">


        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '20px'
            }}
          >
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '10px',
                background: isLogin
                  ? 'linear-gradient(to right, #ff4d4f, #d4af37, #4B0000)'
                  : 'linear-gradient(to right, #cccccc, #eeeeee)',
                color: isLogin ? 'white' : 'black',
                border: 'none',
                borderRadius: '5px 0 0 5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '10px',
                background: !isLogin ? 'linear-gradient(to right, #ff4d4f, #d4af37, #4B0000)': '#ddd',
                color: !isLogin ? 'white' : 'black',
                border: 'none',
                borderRadius: '0 5px 5px 0',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Register
            </button>
          </div>

          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
            {isLogin ? 'Login' : 'Register'}
          </h2>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontWeight: 'bold' }}>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold' }}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold' }}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '8px',
                  background: isLogin
                  ? 'linear-gradient(to right, #ff4d4f, #d4af37, #4B0000)'
                  :'linear-gradient(to right, #ff4d4f, #d4af37, #4B0000)',
               
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;
