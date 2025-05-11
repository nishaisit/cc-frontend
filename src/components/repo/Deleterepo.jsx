import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./deleteRepo.css";

const DeleteRepo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/repo/delete/${id}`);
      alert("Repository deleted successfully!");
      navigate("/repos");
    } catch (err) {
      console.error("Error deleting repository:", err.message);
      alert("Failed to delete repository.");
    }
  };

  return (
    <div className="delete-repo-container">
      <h3>Are you sure you want to delete this repository?</h3>
      <p className="delete-warning">This action cannot be undone.</p>
      <button className="btn btn-danger delete-button" onClick={handleDelete}>
        Yes, Delete
      </button>
      <button className="btn cancel-button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteRepo;
