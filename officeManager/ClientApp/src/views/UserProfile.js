import React, { useState } from "react";
// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Modal,
} from "react-bootstrap";

export default function User() {
    const [id, setId] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [carNumber, setCarNumber] = useState();
    const [role, setRole] = useState();
    const [floor, setFloor] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [permissionLevel, setPermissionLevel] = useState();
    const [department, setDepartment] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function onChange(id) {
        console.log("on handel submit" + id);

        setId(id)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        //console.log("id " + id);
        //console.log("firstName " + firstName);
        //console.log("lastName " + lastName);
        //console.log("email " + email);
        //console.log("carNumber " + carNumber);
        //console.log("floor " + floor);
        //console.log("roomNumber " + roomNumber);
        //console.log("role " + role);
        //console.log("department " + department);
        //console.log("permissionLevel " + permissionLevel);
        var url = "https://localhost:44375/api/users/" + id;
        handleRequest(url, requestOptions)
    }

    async function handleRequest(url, requestOptions) {
        var user = new User()
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            console.log("in the if")
            const data = await response.json();
            console.log(data)
            if (dataChnage != "null") {
                console.log("naama")
                //peopleList = dataChnage.split(",")
                //setPeople(peopleList)
            }
        }
    }

    async function handleSubmit(event) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                //"id": id,
                "id": "205666415",
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "carNumber": carNumber,
                "floor": floor,
                "roomNumber": roomNumber,
                "role": role,
                "permissionLevel": "0",
                //"permissionLevel": permissionLevel,
                "department": department
            })
        };
        var response = await fetch("https://localhost:44375/api/users/" + "205666415", requestOptions);
        //fetch("https://localhost:44375/api/users/" + id, requestOptions);
        event.preventDefault();

        if (response.status == 204) {
            { handleShow() }
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Edit Profile </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form
                                   // onSubmit={handleSubmit} value={"205666415"}
                                >
                                    <Row>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>ID (disabled) </label>
                                                <Form.Control
                                                    disabled
                                                    placeholder="ID"
                                                    type="number"
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    placeholder="First Name"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Last Name</label>
                                                <Form.Control
                                                    placeholder="Last Name"
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Email</label>
                                                <Form.Control
                                                    placeholder="Email"
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
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
                                                <label>Department</label>
                                                <Form.Control
                                                    placeholder="Department"
                                                    type="text"
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="pl-1" md="6">
                                            <Form.Group >
                                                <label>Permission Level (disabled)</label>
                                                <Form.Control
                                                    disabled
                                                    placeholder="Permission Level"
                                                    type="number"
                                                    value={permissionLevel}
                                                    onChange={(e) => setPermissionLevel(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <button type="button"
                                        class="btn btn-primary"
                                        onClick={handleSubmit} value={"205666415"}
                                    >
                                        Update Profile
                  </button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Success</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>User profile was update successfully.</p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={handleClose}>OK</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
