import React from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./deleteProfile.css";

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3002/deleteProfile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/signup"); // Redirect to signup
    } catch (err) {
      alert("❌ Failed to delete profile. Please try again.");
    }
  };

  return (
    <Container className="delete-container">
      <div className="delete-card">
        <h2 className="delete-title">Delete Profile</h2>
        <p className="delete-warning">
          Are you sure you want to permanently delete your profile? This action cannot be undone.
        </p>
        <Button className="delete-btn" onClick={handleDelete}>
          Yes, Delete My Profile
        </Button>
      </div>
    </Container>
  );
};

export default DeleteProfile;
