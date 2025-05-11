// components/CreateRepo.jsx
import React, { useState } from "react";
import { useAuth } from "../../authContext";
import "./createRepo.css"; // Import the CSS file at the top


const CreateRepo = () => {
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true); // true = public
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return setMessage("❌ You must be logged in to create a repository.");
    }
  
    if (!name.trim()) {
      return setMessage("Repository name is required");
    }

    try {
      const response = await fetch("http://localhost:3002/repo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: currentUser,
          name,
          description,
          visibility,
          content: [],
          issues: [],
        }),
      });

      let data;
        try {
        data = await response.json();
        } catch (jsonError) {
          console.error("Failed to parse JSON:", jsonError);
          setMessage("❌ Unexpected server response");
         return;
        }

      if (response.ok) {
        setMessage(`✅ Repo created! ID: ${data.repositoryId}`);
        setName("");
        setDescription("");
      } else {
        setMessage(`❌ ${data.error || "Something went wrong!"}`);
      }
    } catch (err) {
      console.error("Error creating repo:", err);
      setMessage("❌ Server error while creating repo");
    }
  };

  return (
    <div className="create-repo-container">
      <h2>Create Repository</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Repository name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="repo-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="repo-input"
          />
        </div>
        <div className="form-group">
          <label>Visibility:</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value === "true")}
            className="repo-input"
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>
        <button type="submit" className="submit-btn" disabled={!name.trim()}>
          Create
        </button>
      </form>
      {message && <p className="message-text">{message}</p>}
    </div>
  );
};

export default CreateRepo;
