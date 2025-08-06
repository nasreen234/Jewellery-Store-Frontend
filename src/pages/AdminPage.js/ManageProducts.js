import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    productcode: "",
    category: "",
    subcategory: "",
    size: "",
    inStock: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://jewellery-store-one.vercel.app/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Open modal
    const handleShowModal = (product = null) => {
      setEditingProduct(product);
      if (product) {
        setFormData({
          name: product.name || "",
          price: product.price || "",
          productcode: product.productcode || "",
          category: product.category || "",
          subcategory: product.subcategory || "",
          size: product.size || "",
          inStock: product.inStock || "",
          description: product.description || "",
          image: null,
        });
        setPreviewImage(product.image);
      } else {
        setFormData({
          name: "",
          price: "",
          productcode: "",
          category: "",
          subcategory: "",
          size: "",
          inStock: "",
          description: "",
          image: null,
        });
        setPreviewImage(null);
      }
      setShowModal(true);
    };

    //Handle input
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "image" && files.length > 0) {
        setFormData({ ...formData, image: files[0] });
        setPreviewImage(URL.createObjectURL(files[0]));
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

  // Submit (Create/Update)
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      if (editingProduct) {
        await axios.put(`https://jewellery-store-one.vercel.app/api/products/${editingProduct._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("https://jewellery-store-one.vercel.app/api/products", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      //window.location.reload(); // or refetch
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://jewellery-store-one.vercel.app/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Products</h3>
        <Button onClick={() => handleShowModal(null)}>+ Add Product</Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>S.NO</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>PRODUCT CODE</th> 
                <th>CATEGORY</th>
                <th>SUB CATEGORY</th>
                <th>SIZE</th>
                <th>IN-STOCK</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((p, index) => (
                <tr key={p._id}>
                  <td>{indexOfFirstProduct + index + 1}</td>
                  <td>
                    <Image src={p.image} alt={p.name} width={60} height={60} thumbnail />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.productcode}</td>
                  <td>{p.category}</td>
                  <td>{p.subcategory}</td>
                  <td>{Array.isArray(p.size) ? p.size.join(', ') : p.size}</td>
                  <td>{p.inStock ? 'Yes' : 'No'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="warning" onClick={() => handleShowModal(p)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(p._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <span>Page {currentPage} of {totalPages}</span>

            <Button
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit" : "Add"} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Product Code</Form.Label>
                  <Form.Control
                    name="productcode"
                    value={formData.productcode}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>In Stock</Form.Label>
                  <Form.Control
                    name="inStock"
                    value={formData.inStock}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Form.Group>

                {previewImage && (
                  <div className="mt-2">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width="100"
                      height="100"
                      thumbnail
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingProduct ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageProducts;
