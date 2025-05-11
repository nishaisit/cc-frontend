import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./allUsers.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allUsers");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container className="users-container">
      <h2 className="header">All Users</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {users.map((user) => (
          <Col md={4} key={user._id} className="user-card-container">
            <Card className="user-card">
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <Link to={`/userProfile/${user._id}`} className="btn btn-primary">
                  View Profile
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllUsers;

