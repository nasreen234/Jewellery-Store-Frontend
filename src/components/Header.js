import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Header.css';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [input, setInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);


  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { setSearchTerm } = useSearch();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('userName');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';
    setIsAuthenticated(!!token);
    setIsAdmin(adminFlag);
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('cart');
    localStorage.removeItem('userEmail');
    clearCart();
    setIsAuthenticated(false);
    setUserName('');
    alert('Logged out successfully');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setSearchTerm(input);
    navigate('/search');
  };

  return (
    <header className="shadow-sm bg-white fixed-top">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4 text-danger d-flex flex-column align-items-start"
          >
            Golden Glam
            <small className="text-primary fs-6 ms-4" style={{ fontWeight: 'normal' }}>
              Glow like never before.
            </small>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        
          <div className="collapse navbar-collapse" id="navbarResponsive">
            
            <form
              onSubmit={handleSearch}
              className="d-flex input-group my-3 my-lg-0 mx-lg-3 w-100 w-md-50 w-lg-50"
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search jewellery..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn btn-danger rounded-end-pill" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            <div className="d-flex align-items-center gap-3 ms-auto flex-column flex-lg-row">
         
              <Link to="/cart" className="position-relative text-dark">
                <FaShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>

        
              {isAuthenticated ? (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    {userName || 'User'}
                  </button>
                  {menuDisplay && (
                    <ul className="dropdown-menu show position-absolute mt-2">
                      {isAdmin && (
                        <li>
                          <Link
                            to="/admin"
                            className="dropdown-item"
                            onClick={() => setMenuDisplay(false)}
                          >
                            Admin Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/edit-profile"
                          className="dropdown-item"
                          onClick={() => setMenuDisplay(false)}
                        >
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>

                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-danger">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
