import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Spinner,
  Alert,
  Button,
  Badge,
  Modal,
} from 'react-bootstrap';

const ORDERS_PER_PAGE = 10;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        'https://jewellery-store-one.vercel.app/api/orders',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://jewellery-store-one.vercel.app/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      setDeleteSuccess('Order deleted successfully');
      setTimeout(() => setDeleteSuccess(''), 3000);
    } catch (err) {
      alert('Failed to delete order');
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const isPaidBadge = (order) => {
    const paidByMethod =
      ['CARD', 'UPI'].includes(order?.paymentMethod?.toUpperCase?.() || '');
    const paid = order.isPaid || paidByMethod;
    const method = order.paymentMethod || 'N/A';

    return (
      <div className="text-center">
        <Badge bg={paid ? 'success' : 'warning'}>
          {paid ? 'Paid' : 'Unpaid'}
        </Badge>
        <div className="mt-1">
          <small className="text-muted">{method}</small>
        </div>
      </div>
    );
  };

  // Pagination logic
  const indexOfLast = currentPage * ORDERS_PER_PAGE;
  const indexOfFirst = indexOfLast - ORDERS_PER_PAGE;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2 className="mb-4 text-center">Manage Orders</h2>

      {deleteSuccess && (
        <Alert
          variant="success"
          onClose={() => setDeleteSuccess('')}
          dismissible
          className="text-center w-75"
        >
          {deleteSuccess}
        </Alert>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Table striped bordered hover className="align-middle text-center">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Shipping Address</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Placed At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6).toUpperCase()}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td className="text-break">{order.user?.email || 'N/A'}</td>
                    <td>{order.orderItems?.length}</td>
                    <td>₹{order.totalPrice}</td>
                    <td className="text-break">
                      <strong>{order.shippingAddress?.name}</strong><br />
                      {order.shippingAddress?.mobilenumber}<br />
                      {order.shippingAddress?.address}<br />
                      {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                    </td>
                    <td>{isPaidBadge(order)}</td>
                    <td>
                      {order.isDelivered ? (
                        <Badge bg="success">Delivered</Badge>
                      ) : (
                        <Badge bg="secondary">Pending</Badge>
                      )}
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <Button variant="info" size="sm" onClick={() => handleView(order)}>
                          View
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(order._id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button
              variant="outline-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* View Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <>
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>User Email:</strong> {selectedOrder.user?.email}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <p>
                <strong>Status:</strong>{' '}
                {selectedOrder.isPaid ? (
                  <span className="badge bg-success">Paid</span>
                ) : (
                  <span className="badge bg-danger">Unpaid</span>
                )}{' '}
                {selectedOrder.isDelivered ? (
                  <span className="badge bg-success">Delivered</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pending</span>
                )}
              </p>
              <p><strong>Total Price:</strong> ₹{selectedOrder.totalPrice}</p>
              <p>
                <strong>Shipping Address:</strong><br />
                {selectedOrder.shippingAddress?.name}<br />
                {selectedOrder.shippingAddress?.mobilenumber}<br />
                {selectedOrder.shippingAddress?.address}<br />
                {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
              </p>
              <hr />
              <h5>Ordered Items:</h5>
              <ul className="list-unstyled">
                {selectedOrder.orderItems.map((item, i) => {
                  const productName = item.product?.name || item.name || 'Unnamed Product';
                  const productPrice = item.price || item.product?.price || 0;
                  const productImage = item.image || item.product?.image;
                  const qty = item.qty || 1;
                  const total = (qty * productPrice).toFixed(2);

                  return (
                    <li key={i} className="d-flex align-items-center mb-2">
                      {productImage && (
                        <img
                          src={productImage}
                          alt={productName}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            marginRight: '10px',
                            borderRadius: '5px',
                          }}
                        />
                      )}
                      <div>
                        <strong>{productName}</strong><br />
                        Qty: {qty} × ₹{productPrice} = ₹{total}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageOrders;
