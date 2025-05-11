import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./currUser.css";

const CurrUserRepo = () => {
  const { userId } = useParams();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/repo/user/${userId}`);
        setRepos(res.data.repositories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user's repos:", err.message);
      }
    };

    fetchUserRepos();
  }, [userId]);

  if (loading) return <div>Loading your repositories...</div>;
  if (repos.length === 0) return <div>No repositories found for this user.</div>;

  return (
    <div className="container user-repos-container">
      <h3>Your Repositories</h3>
      <div className="row">
        {repos.map((repo) => (
          <div className="col-md-4 mb-3" key={repo._id}>
            <div className="user-repo-card">
              <h5 className="user-repo-title">{repo.name}</h5>
              <p>{repo.description}</p>
              <p className="user-repo-meta">
                Visibility: {repo.visibility ? "Public" : "Private"}
              </p>
              <a href={`/repo/${repo._id}`} className="btn btn-primary mt-2">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrUserRepo;
