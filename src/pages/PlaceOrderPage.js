
  import React, { useState } from 'react';
  import { useCart } from '../context/CartContext';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap';
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  const PlaceOrderPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
      name: '',
      mobilenumber: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');

    const handlePlaceOrder = async () => {
      const { name, mobilenumber, address, city, postalCode, country } = shippingAddress;

      if (!name || !mobilenumber || !address || !city || !postalCode || !country) {
        alert('Please fill in all shipping fields.');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const body = {
          orderItems: cartItems,
          shippingAddress,
          totalPrice:totalPrice,
          paymentMethod,
        };

        console.log(body)
        await axios.post('https://jewellery-store-one.vercel.app/api/orders' , body, config);

        clearCart();
        alert('Order Placed Successfully!');
        navigate('/order-success');
      } catch (error) {
        console.error('Order Error:', error.response?.data || error.message);
        alert('Failed to place order.');
      }
    };

    return (
      <>
        <Header />
      <Container className="mt-5 mb-5 py-5">
        <h2 className="text-center mb-4">Checkout</h2>
        <Row>
          {/* Address Section */}
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h4 className="mb-3">Shipping Address</h4>
              <Form>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={shippingAddress.name}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="mobileNumber" className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={shippingAddress.mobilenumber}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, mobilenumber: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="city" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, city: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="postalCode" className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter postal code"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="country" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, country: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>

          {/* Payment Section */}
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h4 className="mb-3">Select Payment Method</h4>
              <Form>
                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="UPI"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="Card"
                  name="paymentMethod"
                  value="Card"
                  checked={paymentMethod === 'Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-4"
                />
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
      </>
    );
  };

  export default PlaceOrderPage;
