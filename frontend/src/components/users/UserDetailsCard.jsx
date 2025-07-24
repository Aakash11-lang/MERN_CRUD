import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const UserDetailsCard = ({ user }) => {
  const displayValue = (value) => {
    return value?.toString().trim() !== "" ? value : "---";
  };

  if (!user) return <p>No user selected.</p>;

  return (
    <Card className="my-4">
      <Card.Header>
        <strong>name:</strong> ({user.username})
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Email:</strong> {displayValue(user.email)}
        </Card.Text>

        <Card.Text>
          <strong>Phone:</strong> {displayValue(user.phone)}
        </Card.Text>

        <Card.Text>
          <strong>Website:</strong> {displayValue(user.website)}
        </Card.Text>

        <Card.Title className="mt-3">Address</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Street:</strong> {displayValue(user.address?.street)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Suite:</strong> {displayValue(user.address?.suite)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>City:</strong> {displayValue(user.address?.city)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Zipcode:</strong> {displayValue(user.address?.zipcode)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Geo:</strong>
            {displayValue(user.address?.geo?.lat)},{" "}
            {displayValue(user.address?.geo?.lng)}
          </ListGroup.Item>
        </ListGroup>

        <Card.Title className="mt-3">Company</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Name:</strong> {displayValue(user.company?.name)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Catch Phrase:</strong>{" "}
            {displayValue(user.company?.catchPhrase)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>BS:</strong> {displayValue(user.company?.bs)}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UserDetailsCard;
