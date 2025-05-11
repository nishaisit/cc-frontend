import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./repoById.css";

const RepoById = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/repo/${id}`);
        setRepo(res.data[0]); // since your backend returns an array
        setLoading(false);
      } catch (err) {
        console.error("Error fetching repository:", err.message);
      }
    };
    fetchRepo();
  }, [id]);

  if (loading) return <div>Loading repository...</div>;
  if (!repo) return <div>Repository not found.</div>;

  return (
    <div className="repo-details-container">
      <div className="repo-details-card">
        <h2 className="repo-details-title">{repo.name}</h2>
        <p className="repo-details-desc">{repo.description || "No description provided."}</p>
        <p className="repo-details-meta">Visibility: {repo.visibility ? "Public" : "Private"}</p>
        <p className="repo-details-meta">Owner: {repo.owner?.username || "Unknown"}</p>
        <p className="repo-details-meta">Created At: {new Date(repo.createdAt).toLocaleDateString()}</p>

        <div className="repo-issues">
          <h5>Issues:</h5>
          {repo.issues && repo.issues.length > 0 ? (
            <ul>
              {repo.issues.map((issueId) => (
                <li key={issueId}>{issueId}</li>
              ))}
            </ul>
          ) : (
            <p>No issues yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoById;
