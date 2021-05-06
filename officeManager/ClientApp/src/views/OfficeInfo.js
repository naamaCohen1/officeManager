import React from "react";

// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col
} from "react-bootstrap";

function OfficeInfo() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Office Information</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Employees' Number</label>
                                                <Form.Control
                                                    placeholder="Enter the number of employees"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Parking's Number</label>
                                                <Form.Control
                                                    placeholder="Enter the umber of parking places"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Floors' Number</label>
                                                <Form.Control
                                                    placeholder="Enter the number of floors"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Rooms' Number</label>
                                                <Form.Control
                                                    placeholder="Enter the number of rooms in the office"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="5">
                                            <Form.Group>
                                                <label>Meetting Rooms' Number</label>
                                                <Form.Control
                                                    placeholder="Enter the number of meetting rooms in the office"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Office Capacity</label>
                                                <Form.Control
                                                    placeholder="Enter the allowed office capacity percentage"
                                                    type="number"
                                                    max="100"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="5">
                                            <Form.Group>
                                                <label>Open Space</label>
                                                <Form.Control
                                                    as="select"
                                                    className="openspace-select"
                                                    id="openspace-select"
                                                    style={{ width: '265px' }}
                                                >
                                                    <option value="0">Is the office is an open space?</option>
                                                    <option value="1">Yse</option>
                                                    <option value="2">No</option>
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>HotSpots</label>
                                                <Form.Control
                                                    as="select"
                                                    className="hotspots-select"
                                                    id="hotspots-select"
                                                    style={{ width: '265px' }}
                                                >
                                                    <option value="0">Is there hotspots in the office?</option>
                                                    <option value="1">Yse</option>
                                                    <option value="2">No</option>
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="success"
                                    >
                                        Save Changes
                  </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default OfficeInfo;
