import React, { useState } from "react";
//import React from "react";
// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";

function User() {
    const [carNumber, setCarNumber] = useState(0);
    const [role, setRole] = useState("");
    const [floor, setFloor] = useState(0);
    const [roomNumber, setRoomNumber] = useState(0);

    function handleSubmit(event) {
        //const requestOptions = {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json',
        //        'Accept': 'application/json'
        //    },
        //    body: JSON.stringify({
        //        username: username,
        //        password: password
        //    })
        //};
        //console.log(requestOptions);
        //fetch("https://localhost:5001/api/login/", requestOptions).then(response => console.log(response.status));
        //console.log(data);
        console.log("on handel submit" + carNumber);
        console.log("on handel submit" + role);
        event.preventDefault();
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Edit Profile</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Name (disabled)</label>
                                                <Form.Control
                                                    disabled
                                                    placeholder="Name"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>ID (disabled) </label>
                                                <Form.Control
                                                    disabled
                                                    placeholder="ID"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Car Number</label>
                                                <Form.Control
                                                    placeholder="Car Number"
                                                    type="number"
                                                    value={carNumber}
                                                    onChange={(e) => setCarNumber(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label for="validationCustom01" class="form-label">Role</label>
                                                <Form.Control
                                                    placeholder="Role"
                                                    type="text"
                                                    class="form-control"
                                                    id="validationCustom01"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                ></Form.Control>
                                            {/*    <div class="valid-feedback">*/}
                                            {/*        Looks good!*/}
                                            {/*    </div>*/}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="5">
                                            <Form.Group>
                                                <label>Floor</label>
                                                <Form.Control
                                                    placeholder="Floor"
                                                    type="number"
                                                    value={floor}
                                                    onChange={(e) => setFloor(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Room Number</label>
                                                <Form.Control
                                                    placeholder="Room Number"
                                                    type="number"
                                                    value={roomNumber}
                                                    onChange={(e) => setRoomNumber(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="6">
                                            <Form.Group >
                                                <label>Permission Level (disabled)</label>
                                                <Form.Control
                                                    disabled
                                                    placeholder="Permission Level"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="success"
                                    >
                                            Update Profile
                  </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
