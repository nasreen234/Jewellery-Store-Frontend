import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Contactus.css';
import Header from '../components/Header.js';


const Contactus = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <Header/>
    <Container className="contact-container ">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4 mt-3 contact-heading">Get in Touch</h2>
          <p className="text-center text-muted">We'd love to hear from you! Whether it's a question, feedback, or custom order inquiry.</p>

          {submitted && (
            <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
              Thank you! We will get back to you soon.
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="p-4 contact-form rounded">
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="dark" type="submit" className="golden-button px-5">
                Send Message
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Contactus;
