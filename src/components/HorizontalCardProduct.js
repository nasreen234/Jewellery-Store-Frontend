
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HorizontalCardProduct = ({ category, heading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(`https://jewellery-store-one.vercel.app/api/products`);
      const filtered = res.data.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(filtered.slice(0, 10)); 
      setLoading(false);
    } catch (err) {
      console.error('Error fetching category products:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  return (
    <div className="container my-4">
      <h4 className="mb-3 text-warning fw-bold">{heading}</h4>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-muted text-center">No products available in this category.</p>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={false}
          arrows
          autoPlay={false}
          itemClass="px-2"
        >
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card className="shadow-sm border border-warning rounded-4" style={{ minHeight: '340px' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '1rem',
                    borderTopRightRadius: '1rem',
                  }}
                />
                <Card.Body>
                  <Card.Title className="fs-6 text-truncate">{product.name}</Card.Title>
                  <Card.Text className="text-danger fw-semibold">₹{product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default HorizontalCardProduct;
