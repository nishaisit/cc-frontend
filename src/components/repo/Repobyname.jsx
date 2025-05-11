import React, { useState } from "react";
import axios from "axios";
import "./repoByName.css";

const RepoByName = () => {
  const [name, setName] = useState("");
  const [repo, setRepo] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3002/repo/name/${name}`);
      if (res.data.length > 0) {
        setRepo(res.data[0]);
        setError("");
      } else {
        setRepo(null);
        setError("No repository found.");
      }
    } catch (err) {
      console.error("Error fetching repo by name:", err.message);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="repo-by-name-container">
      <h3>Search Repository by Name</h3>
      <form onSubmit={handleSearch} className="repo-search-form">
        <input
          type="text"
          placeholder="Enter repository name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="repo-search-input"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {error && <p className="text-danger">{error}</p>}

      {repo && (
        <div className="repo-result-card">
          <h4>{repo.name}</h4>
          <p>{repo.description}</p>
          <p><strong>Visibility:</strong> {repo.visibility ? "Public" : "Private"}</p>
          <p><strong>Owner:</strong> {repo.owner?.username || "Unknown"}</p>
          <a href={`/repo/${repo._id}`} className="btn btn-outline-primary mt-2">View Details</a>
        </div>
      )}
    </div>
  );
};

export default RepoByName;
