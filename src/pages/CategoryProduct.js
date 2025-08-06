// src/pages/CategoryProduct.js
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Form, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryProduct = () => {
  const location = useLocation();

  const selectedCategoryFromHome = location.state?.selectedCategory?.toLowerCase() || '';
  const subcategoriesFromHome = useMemo(() => {
    return (location.state?.subcategories || []).map((sub) => sub.toLowerCase());
  }, [location.state?.subcategories]);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [navigatedFromHome, setNavigatedFromHome] = useState(false);

  const allCategories = [
    'Necklace', 'Earrings', 'Bangles', 'Rings',
    'Anklet', 'Bracelet', 'Bridal combo', 'Haram'
  ];

  // 1. On mount — preselect checkbox if coming from home
  useEffect(() => {
    if (selectedCategoryFromHome) {
      setSelectedCategories([selectedCategoryFromHome]);
      setNavigatedFromHome(true); // mark that this was a home click
    }
  }, [selectedCategoryFromHome]);

  // 2. Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('https://jewellery-store-one.vercel.app/api/products');
        console.log(products.image); 

        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // 3. Apply filters
  useEffect(() => {
    let filteredData = [...products];

    // Case A: checkboxes selected → show matching categories
    if (selectedCategories.length > 0) {
      filteredData = filteredData.filter((p) =>
        selectedCategories.includes(p.category?.toLowerCase())
      );
    }

     // Case B: If no categories selected and user came from Home with subcategories
  else if (navigatedFromHome && subcategoriesFromHome.length > 0) {
    filteredData = filteredData.filter((p) =>
      subcategoriesFromHome.includes(p.subcategory?.toLowerCase())
    );
  }

    // Price sort
    if (priceRange === 'low') {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (priceRange === 'high') {
      filteredData.sort((a, b) => b.price - a.price);
    }

    setFiltered(filteredData);
  }, [products, selectedCategories, subcategoriesFromHome, priceRange, navigatedFromHome]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const lowerVal = value.toLowerCase();

    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, lowerVal];
      } else {
        const updated = prev.filter((cat) => cat !== lowerVal);
        // If all checkboxes are unchecked, clear "navigatedFromHome" flag to show all
        if (updated.length === 0) setNavigatedFromHome(false);
        return updated;
      }
    });
  };

  return (
    <>
      <Header />

      <div className="container py-4 mt-5 mb-5 pt-5">
        <Row>
          {/* Filters Sidebar */}
          <Col md={3}>
            <h5 className="mb-3">Filter By</h5>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Category</Form.Label>
              {allCategories.map((cat, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={cat}
                  value={cat}
                  checked={selectedCategories.includes(cat.toLowerCase())}
                  onChange={handleCategoryChange}
                />
              ))}
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-bold">Price</Form.Label>
              <Form.Check
                type="radio"
                label="Low to High"
                name="price"
                value="low"
                onChange={(e) => setPriceRange(e.target.value)}
                checked={priceRange === 'low'}
              />
              <Form.Check
                type="radio"
                label="High to Low"
                name="price"
                value="high"
                onChange={(e) => setPriceRange(e.target.value)}
                checked={priceRange === 'high'}
              />
            </Form.Group>
          </Col>

          {/* Product Display */}
          <Col md={9}>
            <h4 className="mb-3 text-warning fw-bold">Filtered Products</h4>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-muted">No products found.</p>
            ) : (
              <Row xs={1} sm={2} md={3} lg={3} className="g-4">
                {filtered.map((product) => (
                  <Col key={product._id}>
                    <Card className="h-100 shadow-sm border border-warning rounded-4">
                      <Link to={`/product/${product._id}`}>
                       <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
                        style={{ height: '240px', objectFit: 'cover' }}
                      />
                      </Link>
                     
                      <Card.Body>
                        <Card.Title className="fs-6 text-truncate">
                          {product.name}
                        </Card.Title>
                        <Card.Text className="text-danger fw-semibold">
                          ₹{product.price}
                        </Card.Text>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          as={Link}
                          to={`/product/${product._id}`}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default CategoryProduct;
