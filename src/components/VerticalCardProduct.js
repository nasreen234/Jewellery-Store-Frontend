
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const VerticalCardProduct = ({ title, items }) => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  return (
    <div className="container my-4">
      <h4 className="mb-3 fw-bold">{title}</h4>

      {(items && items.length > 0) ? (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2500}
          arrows
          draggable
          swipeable
          itemClass="px-2"
        >
          {items.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
            <Card
              key={product._id}
              className="shadow-sm"
              style={{ minHeight: '320px' }}
            >
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{
                  height: '280px',
                  objectFit: 'cover'
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
      ) : (
        <p className="text-muted text-center">No products available.</p>
      )}
    </div>
  );
};

export default VerticalCardProduct;
