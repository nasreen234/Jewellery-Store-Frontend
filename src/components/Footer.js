import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebookF, FaTwitter, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer mt-5 py-4 text-light">
      <Container>
        <Row>
          
          <Col md={4} className="mb-4">
            <h5 className="footer-brand">Golden Glam</h5>
            <p>Premium handcrafted imitation jewellery for every occasion. Sparkle with elegance.</p>
          </Col>

          
          <Col md={4} className="mb-4">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/" className="footer-link">Shop</a></li>
              <li><a href="/cart" className="footer-link">Cart</a></li>
              <li><a href="/contact" className="footer-link">Contact Us</a></li>
            </ul>
          </Col>

       
          <Col md={4}>
            <h5 className="footer-heading">Get in Touch</h5>
            <p><FaPhoneAlt className="me-2" /> +91 98765 43210</p>
            <p><FaEnvelope className="me-2" /> support@goldenglam.com</p>
            <div className="social-icons mt-3">
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
            </div>
          </Col>
        </Row>
        <hr className="footer-line" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Golden Glam. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
