import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";

export default function User() {
    const [orgID, setOrgID] = useState(sessionStorage.getItem("org_id"));

    const [id, setId] = React.useState(sessionStorage.getItem("id"));
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [carNumber, setCarNumber] = useState("");
    const [role, setRole] = useState("");
    const [floor, setFloor] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [permissionLevel, setPermissionLevel] = useState("");
    const [department, setDepartment] = useState("");

    const [validatedEdit, setValidatedEdit] = useState(false);

    const [message, setMessage] = useState();
    const [title, setTitle] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            { editEmployee() }
        }
        setValidatedEdit(true);
    };

    async function loadPage() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "http://officemanager.us-east-1.elasticbeanstalk.com/api/users/" + orgID + "/" + id;
        handleRequest(url, requestOptions)
    }

    async function handleRequest(url, requestOptions) {
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            if (data != "null") {
                var dataChange = data.replace("}", "")
                var params = dataChange.split(",")
                var dictionary = []
                for (var index in params) {
                    var temp = params[index].split(":")
                    temp[1] = temp[1].replace("\"", "")
                    temp[1] = temp[1].replace("\"", "")
                    dictionary.push(temp[1].trim())
                }

                setId(dictionary[0])
                setFirstName(dictionary[1])
                setLastName(dictionary[2])
                setEmail(dictionary[3])
                setCarNumber(dictionary[4])
                setFloor(dictionary[5])
                setRoomNumber(dictionary[6])
                setRole(dictionary[7])
                setDepartment(dictionary[9])
                setPermissionLevel(dictionary[8])
            }
        }
    }

    async function editEmployee() {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "carNumber": carNumber,
                "floor": floor,
                "roomNumber": roomNumber,
                "role": role,
                "department": department,
                "permissionLevel": permissionLevel
            })
        };
        var response = await fetch("http://officemanager.us-east-1.elasticbeanstalk.com/api/users/" + orgID + "/" + id, requestOptions);
        if (response.status == 204) {
            setTitle("Info")
            setMessage("Profile was updated.")
            { handleShow() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to update profile.")
            { handleShow() }
        }
    }

    useEffect(() => {
        loadPage();
    }, []);

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
                                <Form noValidate validated={validatedEdit} onSubmit={handleEdit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>ID  (disabled) </Form.Label>
                                            <Form.Control required type="text" placeholder="ID" disabled
                                                value={id}
                                                onChange={(e) => setId(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control required type="text" placeholder="First name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control required type="text" placeholder="Last name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control required type="text" placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Car Number</Form.Label>
                                            <Form.Control type="text" placeholder="Car Number"
                                                value={carNumber}
                                                onChange={(e) => setCarNumber(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Floor</Form.Label>
                                            <Form.Control type="text" placeholder="Floor" required
                                                value={floor}
                                                onChange={(e) => setFloor(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Room Number</Form.Label>
                                            <Form.Control type="text" placeholder="Room Number" required
                                                value={roomNumber}
                                                onChange={(e) => setRoomNumber(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Role</Form.Label>
                                            <Form.Control type="text" placeholder="Role" required
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control type="text" placeholder="Department" required
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <label>Permission Level (disabled)</label>
                                            <Form.Control
                                                required disabled
                                                as="select"
                                                className="permission-select"
                                                id="permission-select"
                                                style={{ width: '230x' }}
                                                value={permissionLevel}
                                                onChange={(e) => setPermissionLevel(e.target.value)}
                                            >
                                                <option value="0">ADMINISTRATOR</option>
                                                <option value="1">STANDARD</option>
                                                ></Form.Control>
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <button type="submit" class="btn btn-primary" >Edit</button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}