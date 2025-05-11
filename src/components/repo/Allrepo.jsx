import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allRepo.css";

const AllRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starred, setStarred] = useState({});

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get("http://localhost:3002/repo/all");
        setRepos(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching all repositories:", err.message);
      }
    };
    fetchRepos();
  }, []);

  const toggleStar = (repoId) => {
    setStarred((prev) => ({
      ...prev,
      [repoId]: !prev[repoId],
    }));
  };

  if (loading) return <div>Loading repositories...</div>;

  return (
    <div className="container repo-container">
      <h2>All Repositories</h2>
      <div className="row">
        {repos.map((repo) => (
          <div className="col-md-4 mb-3" key={repo._id}>
            <div className="card repo-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title repo-title">{repo.name}</h5>
                  <i
                    className={`bi ${starred[repo._id] ? "bi-star-fill" : "bi-star"} star-icon`}
                    onClick={() => toggleStar(repo._id)}
                    title={starred[repo._id] ? "Unstar" : "Star"}
                  ></i>
                </div>
                <p className="card-text repo-description">{repo.description}</p>
                <p className="repo-visibility">
                  Visibility: {repo.visibility ? "Public" : "Private"}
                </p>
                <a href={`/repo/${repo._id}`} className="btn btn-primary repo-btn">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRepos;
