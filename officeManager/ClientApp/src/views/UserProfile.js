import React from "react";

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
                                <Form>
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
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Room Number</label>
                                                <Form.Control
                                                    placeholder="Room Number"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
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
