import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "./updateProfile.css";

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3002/updateProfile/${id}`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/userProfile/${id}`);
    } catch (err) {
      setError("❌ Failed to update profile. Please try again.");
    }
  };

  return (
    <Container className="update-container">
      <div className="update-card">
        <h2 className="update-title">Update Profile</h2>
        {error && <p className="error-text">{error}</p>}
        <Form onSubmit={handleUpdate} className="update-form">
          <Form.Group controlId="email" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="update-btn" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateProfile;
