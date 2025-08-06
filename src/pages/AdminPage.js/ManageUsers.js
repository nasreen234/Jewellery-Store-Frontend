import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import { flushSync } from 'react-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://jewellery-store-one.vercel.app/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://jewellery-store-one.vercel.app/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Force flush success message before re-render
 flushSync(() => {
        setSuccessMessage("User deleted from admin page successfully");
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

      // Clear message 
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }
};

  // View User Modal
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Users</h3>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>S.No</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>CREATED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => handleViewUser(user)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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

      {/* Modal to View User Info */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Admin:</strong> {selectedUser.isAdmin ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;
