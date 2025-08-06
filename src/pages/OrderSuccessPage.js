import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderSuccessPage = () => {
  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '80vh' }}>
        <Card className="shadow-lg p-4 text-center border-0" style={{ maxWidth: '500px', borderRadius: '20px' }}>
          <div style={{ fontSize: '60px', color: '#28a745' }}>✅</div>
          <h2 className="my-3" style={{ color: '#BFA760', fontWeight: '700' }}>Order Placed Successfully!</h2>
          <p className="text-muted">
            Thank you for shopping with us. Your beautiful jewellery is being prepared for dispatch. ✨
          </p>
          <div className="d-grid gap-2 mt-4">
            <Link to="/">
              <Button variant="warning" className="w-100" style={{ borderRadius: '10px' }}>
                ← Back to Home
              </Button>
            </Link>
            <Link to="/my-orders">
              <Button variant="dark" className="w-100" style={{ borderRadius: '10px' }}>
                View My Orders
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
