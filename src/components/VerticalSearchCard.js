import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VerticalCard = ({ item }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={item.image}
        alt={item.name}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title className="fs-6 text-truncate">{item.name}</Card.Title>
        <Card.Text className="text-danger fw-semibold">₹{item.price}</Card.Text>
        <Link to={`/product/${item._id}`}>
          <Button variant="outline-dark" size="sm">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default VerticalCard;
