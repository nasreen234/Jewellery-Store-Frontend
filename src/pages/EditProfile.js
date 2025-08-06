import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const EditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
    
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://jewellery-store-one.vercel.app/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
           console.log('Fetched User Profile:', res.data);
        setForm((prev) => ({ ...prev, ...res.data }));
      } catch (err) {
        console.error('Error fetching profile:', err.response?.data || err.message);
        setError('Error loading user profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://jewellery-store-one.vercel.app/api/users/me', form, {
       
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Profile updated successfully!');
      setForm((prev) => ({ ...prev, password: '' })); // Clear password field after update
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  

  return (
    <>
    <Header/>
    <div className="container mt-5 mb-5 py-5">
      <h2>Edit Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary">Update Profile</button>
      </form>
    </div>
    </>
  );
};

export default EditProfile;
