
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        'https://jewellery-store-one.vercel.app/api/orders/my',
        config
      );
        console.log('Fetched Orders:', data); 
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5 mb-5 py-5">
        <h2 className="text-center mb-4">My Orders</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : orders.length === 0 ? (
          <Alert variant="info">You have no orders.</Alert>
        ) : (
          <>
            {/* Desktop View */}
            <div className="d-none d-md-block">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-6)}</td>
                      <td>₹{order.totalPrice}</td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        {order.shippingAddress.name} <br />
                        {order.shippingAddress.mobilenumber} <br />
                        {order.shippingAddress.address}, {order.shippingAddress.city} <br />
                        {order.shippingAddress.postalCode}
                      </td>
                     

                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <ul className="mb-0 p-0" style={{ listStyleType: 'none' }}>
                          {order.orderItems.map((item, idx) => (
                            <li key={idx} className="d-flex align-items-center mb-2">
                              <Image src={item.image} rounded style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} />
                              <span>{item.name} - ₹{item.price}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="d-block d-md-none">
              <Row xs={1} className="g-3">
                {orders.map((order) => (
                  <Col key={order._id}>
                    <Card className="shadow-sm">
                      <Card.Body>
                        <Card.Title className="mb-3">
                          Order #{order._id.slice(-6)}
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <strong>Total:</strong> ₹{order.totalPrice}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Payment:</strong> {order.paymentMethod}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Address:</strong><br />
                            {order.shippingAddress.address}, {order.shippingAddress.mobilenumber},{order.shippingAddress.city}, {order.shippingAddress.postalCode}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Items:</strong>
                            <ul className="mb-0 ps-0" style={{ listStyleType: 'none' }}>
                              {order.orderItems.map((item, idx) => (
                                <li key={idx} className="d-flex align-items-center mb-2">
                                  <Image src={item.image} rounded style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} />
                                  <span>{item.name} - ₹{item.price}</span>
                                </li>
                              ))}
                            </ul>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
