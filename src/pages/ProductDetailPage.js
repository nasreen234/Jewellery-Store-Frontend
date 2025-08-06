import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button, Spinner, Row, Col, Card, Container, Badge } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://jewellery-store-one.vercel.app/api/products/${id}`);
        setProduct(res.data);

        const rec = await axios.get(`https://jewellery-store-one.vercel.app/api/products?category=${res.data.category}`);
        const filtered = rec.data.filter(p => p._id !== id);
        setRecommended(filtered.slice(0, 4));
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const user = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    const added = addToCart(product, 1);

    if (added && email && user) {
      navigate('/cart');
      toast.success("Added to cart");
    } else {
      navigate('/login');
    }
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    toast.success(wishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
  };

  const renderRating = (stars = 4) => (
    <div className="text-warning mb-2">
      {[...Array(5)].map((_, i) =>
        i < stars ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </div>
  );

  return (
    <>
      <Header />

      <Container className="mt-4">
        <CategoryList />

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" variant="warning" />
          </div>
        ) : !product ? (
          <p className="text-center mt-5">Product not found</p>
        ) : (
          <>
            {/* Product Details */}
            <Card className="p-4 shadow-lg border-0 rounded-4 my-5 bg-light">
              <Row className="align-items-center">
                <Col md={6} className="text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded-4 border border-3 border-warning"
                    style={{ maxHeight: '420px', objectFit: 'contain' }}
                  />
                </Col>
                <Col md={6}>
                  <h2 className="fw-bold mb-2">{product.name}</h2>
                  <Badge bg="warning" className="mb-3 fs-6 px-3 py-2 text-dark rounded-pill">
                    {product.category}
                  </Badge>

                  <div className="d-flex align-items-center justify-content-between">
                    {renderRating(4)}
                    <Button variant="link" onClick={toggleWishlist} className="text-danger fs-4">
                      {wishlist ? <FaHeart /> : <FaRegHeart />}
                    </Button>
                  </div>

                  <p className="text-muted fs-6">{product.description}</p>

                  <h4 className="mt-4 mb-2">
                    <span className="text-dark">Price:</span>{' '}
                    <span className="text-dark fw-bold fs-3">₹{product.price}</span>
                  </h4>

                  <p className="fw-semibold">
                    Status:{' '}
                    {product.inStock ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Out of Stock</Badge>
                    )}
                  </p>

                  <Button
                    variant="warning"
                    size="lg"
                    className="rounded-5 px-4 fw-semibold mt-3"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <i className="bi bi-cart-plus me-2"></i> Add to Cart
                  </Button>
                </Col>
              </Row>
            </Card>

            {/* Reviews */}
            <Card className="border-0 rounded-4 p-4 mb-5 bg-white shadow-sm">
              <h5 className="fw-bold mb-4">Customer Reviews</h5>
              <div className="border-bottom pb-3 mb-3">
                <strong>Priya Sharmila</strong>
                <div>{renderRating(5)}</div>
                <p>Absolutely loved this piece! Great quality and elegant look.</p>
              </div>
              <div className="border-bottom pb-3 mb-3">
                <strong>Mehta</strong>
                <div>{renderRating(4)}</div>
                <p>Beautiful design, matches with ethnic wear perfectly.</p>
              </div>
            </Card>

            {/* Recommended Products */}
            {recommended.length > 0 && (
              <>
                <h4 className="mb-4 fw-bold text-dark">Recommended Products</h4>
                <Row xs={1} sm={2} md={4} className="g-4">
                  {recommended.map((item) => (
                    <Col key={item._id}>
                      <Card className="h-100 shadow-sm border-0 rounded-3 hover-shadow">
                        <Link to={`/product/${item._id}`} className="text-decoration-none text-dark">
                          <Card.Img
                            variant="top"
                            src={item.image}
                            className="p-3"
                            style={{ height: '220px', objectFit: 'contain' }}
                          />
                          <Card.Body>
                            <Card.Title className="text-truncate fw-bold">{item.name}</Card.Title>
                            {renderRating(4)}
                            <Card.Text>
                              <span className="text-warning fw-bold">₹{item.price}</span>
                            </Card.Text>
                          </Card.Body>
                        </Link>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
