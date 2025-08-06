import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useSearch } from '../context/SearchContext';
import VerticalCard from '../components/VerticalSearchCard'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchResults = () => {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products (locally filter no backend route)
  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm.trim()) return;

      try {
        setLoading(true);
        const response = await axios.get('https://jewellery-store-one.vercel.app/api/products'); 
        const filtered = response.data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.subcategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.productcode?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProducts(filtered);
      } catch (error) {
        console.error('Search fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Header />
      <Container className="py-5 mt-5">
        <h3 className="mb-4">Search Results for "{searchTerm}"</h3>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : products.length > 0 ? (
          <Row className="g-4">
            {products.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                <VerticalCard item={item} />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No matching products found.</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default SearchResults;
