import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "react-bootstrap"; 
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const user_Id = localStorage.getItem("userId"); 
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/user/${user_Id}`);
        const data = await response.json();
        if (data.repositories) {
          setRepositories(data.repositories); // Ensure repositories are valid
        }
      } catch (err) {
        console.error("Error while fetching the repository: ", err);
      }
    };

    const fetchSuggestedRepos = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fetching repositories", err);
      }
    };

    fetchRepos();
    fetchSuggestedRepos();
  }, [user_Id]);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          repo._id.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {Array.isArray(suggestedRepositories) &&
            suggestedRepositories.map((repo) => {
              return (
                <div key={repo._id}>
                  <h4>{repo.name}</h4>
                  <h4>{repo.description}</h4>
                </div>
              );
            })}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search by repo name or ID..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {Array.isArray(searchResults) &&
            searchResults.map((repo) => {
              return (
                <div key={repo._id} className="repo-card">
                <h4>{repo.name}</h4>
                <h6 className="repo-description">{repo.description}</h6>

  <div className="button-group">
    <Button variant="primary" onClick={() => navigate(`/repo/user/${user_Id}`)}>View My Repositories</Button>
    <Button variant="info" onClick={() => navigate(`/repo/name/${repo.name}`)}>Search Repo by Name</Button>
    <Button variant="secondary" onClick={() => navigate(`/repo/${repo._id}`)}>Search Repo by ID</Button>
    <Button variant="warning" onClick={() => navigate(`/repo/update/${repo._id}`)}>Update Repository</Button>
    <Button variant="danger" onClick={() => navigate(`/repo/delete/${repo._id}`)}>Delete Repository</Button>
  </div>
</div>

              );
            })}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - June 20</p>
            </li>
            <li>
              <p>Developer Meetup - June 26</p>
            </li>
            <li>
              <p>MERN Summit - June 30</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
