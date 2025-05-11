import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./updateRepo.css";

const UpdateRepo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/repo/${id}`);
        const repo = res.data[0];
        setDescription(repo.description || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching repo for update:", err.message);
      }
    };
    fetchRepo();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = {
        content,
        description,
      };
      const res = await axios.put(`/api/repo/update/${id}`, body);
      alert("Repository updated!");
      navigate(`/repo/${id}`);
    } catch (err) {
      console.error("Error updating repository:", err.message);
      alert("Failed to update repo.");
    }
  };

  if (loading) return <div>Loading repository for update...</div>;

  return (
    <div className="update-repo-container">
      <h3>Update Repository</h3>
      <form onSubmit={handleUpdate}>
        <div className="update-repo-form-group">
          <label className="update-repo-label">Description</label>
          <textarea
            className="update-repo-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div className="update-repo-form-group">
          <label className="update-repo-label">Add Content</label>
          <input
            type="text"
            className="update-repo-input"
            placeholder="Add new content string"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success update-repo-button">
          Update Repository
        </button>
      </form>
    </div>
  );
};

export default UpdateRepo;
