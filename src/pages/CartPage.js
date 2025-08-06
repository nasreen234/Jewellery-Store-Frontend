
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  ListGroup,
  ButtonGroup,
  Row,
  Col,
} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const totalAmount = totalPrice;

  return (
    <>
      <Header />
      <Container className="my-5 mb-5 py-5">
        <h2 className="text-center mb-4" style={{ color: '#BFA760', fontWeight: '700' }}>
          🛍️ Your Jewellery Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty.</p>
            <Link to="/">
              <Button variant="warning">← Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <Row>
            {/* Left Column: Cart Items */}
            <Col md={8}>
              {cartItems.map((item, index) => (
                <Card
                  key={index}
                  className="mb-4 shadow-lg border-0"
                  style={{ borderRadius: '20px' }}
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4 text-center p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <Card.Body>
                        <Card.Title className="fw-bold" style={{ color: '#444' }}>
                          {item.name}
                        </Card.Title>
                        <Card.Text className="mb-1" style={{ color: '#888' }}>
                          ₹{item.price}
                        </Card.Text>
                        <Card.Text className="text-muted">
                          Total: ₹{(item.price * item.quantity).toFixed(2)}
                        </Card.Text>

                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">Qty:</span>
                          <ButtonGroup size="sm">
                            <Button
                              variant="outline-secondary"
                              onClick={() => decreaseQuantity(item._id)}
                            >
                              −
                            </Button>
                            <Button variant="light" disabled>
                              {item.quantity || 1}
                            </Button>
                            <Button
                              variant="outline-secondary"
                              onClick={() => increaseQuantity(item._id)}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              ))}
            </Col>

            {/* Right Column: Order Summary */}
            <Col md={4}>
              <Card className="shadow border-0" style={{ borderRadius: '20px' }}>
                <Card.Header
                  className="text-center"
                  style={{
                    background: '#BFA760',
                    color: 'white',
                    fontWeight: 'bold',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                  }}
                >
                  🧾 Order Summary
                </Card.Header>

                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold">{item.name}</div>
                          <div className="text-muted small">
                            ₹{item.price.toFixed(2)} × {item.quantity}
                          </div>
                        </div>
                        <div className="fw-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item className="d-flex justify-content-between mt-2 border-top pt-2">
                    <span className="fw-bold">Total Items</span>
                    <span>
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between">
                    <span className="fw-bold">Total Amount</span>
                    <span>₹{totalAmount}</span>
                  </ListGroup.Item>
                </ListGroup>

                <Card.Footer className="text-center">
                  <Link
                    to="/place-order"
                    className="btn btn-dark w-100"
                    style={{ borderRadius: '10px' }}
                  >
                    Proceed to Checkout
                  </Link>
                  <Link to="/">
                    <Button variant="link" className="mt-2">
                      ← Continue Shopping
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;
