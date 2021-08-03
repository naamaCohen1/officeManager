import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [message, setMessage] = useState();
    const [title, setTitle] = useState();

    const [orgId, setOrgId] = useState("")
    const [name, setName] = useState("")
    const [numOfEmployees, setNumOfEmployees] = useState("")
    const [parkingAmount, setParkingAmount] = useState("")
    const [floorsAmount, setFloorsAmount] = useState("");
    const [roomsAmount, setRoomsAmount] = useState("");
    const [meetingRoomsAmount, setMeetingRoomsAmount] = useState("");
    const [officeCapacity, setOfficeCapacity] = useState("");
    const [openSpace, setOpenSpace] = useState("");
    const [hotSpot, setHotSpot] = useState("");
    const [hotSpotPlaces, setHotSpotPlaces] = useState("");

    const [showAddOffice, setShowAddOffice] = useState(false);
    const handleCloseAddOffice = () => setShowAddOffice(false);
    const handleShowAddOffice = () => setShowAddOffice(true);
    const [validatedAdd, setValidatedAdd] = useState(false);

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [carNumber, setCarNumber] = useState("")
    const [role, setRole] = useState("")
    const [floor, setFloor] = useState("")
    const [roomNumber, setRoomNumber] = useState("");
    const [permissionLevel, setPermissionLevel] = useState("")
    const [department, setDepartment] = useState("")

    const [showAddUser, setShowAddUser] = useState(false);
    const handleCloseAddUser = () => setShowAddUser(false);
    const handleShowAddUser = () => setShowAddUser(true);
    const [validatedAddUser, setValidatedAddUser] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            { login() }
        }
        setValidated(true);
    };

    const handleAdd = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            { AddOffice() }
        }
        setValidatedAdd(true);
    };

    const handleAddUser = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            { AddAdminUser() }
        }
        setValidatedAddUser(true);
    };

    async function AddAdminUser() {
        var mappedPermissionLevel = "1"
        if (permissionLevel.toUpperCase() === 'ADMINISTRATOR') {
            mappedPermissionLevel = "0"
        }

        const requestOptions = {
            method: 'POST',
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
                "permissionLevel": mappedPermissionLevel,
                "department": department
            })
        };
        var url = "https://localhost:44375/api/users";
        const response = await fetch(url, requestOptions);
        if (response.status == 201) {
            { handleCloseAddUser() }
            setTitle("Info")
            setMessage("Organiztion was added, Please sign in with your admin user")
            { handleShowModal() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to add admin user.")
            { handleShowModal() }
        }
    }

    async function AddOffice(event) {
        var open = "False"
        if (openSpace === 'Yes')
            open = "True"

        var hot = "False"
        if (hotSpot === 'Yes')
            hot = "True"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "numOfEmployees": numOfEmployees,
                "parkingAmount": parkingAmount,
                "floorsAmount": floorsAmount,
                "roomsAmount": roomsAmount,
                "meetingRoomsAmount": meetingRoomsAmount,
                "officeCapacity": officeCapacity,
                "openSpace": open,
                "hotSpot": hot,
                "hotSpotPlaces": hotSpotPlaces,
                "id": orgId
            })
        };
        console.log(requestOptions)
        var response = await fetch("https://localhost:44375/api/offices", requestOptions);
        if (response.status == 201) {
            { handleCloseAddOffice() }
            { handleShowAddUser() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to add organization.")
            { handleShowModal() }
        }
    }

    async function refreshPage() {
        { handleClose() }
        window.location.replace("https://localhost:44375/admin/user");
    }

    async function login() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        };
        const response = await fetch("https://localhost:44375/api/login/", requestOptions)
        if (response.status != 200) {
            setTitle("Error")
            setMessage("Invalid Email or Password. Please try again")
            { handleShowModal() }
        }
        else {
            sessionStorage.setItem("id", password)
            sessionStorage.setItem("loggedin", true)
            var permission = await response.json()
            if (permission == 0) {
                sessionStorage.setItem("admin", true)
            }
            else {
                sessionStorage.setItem("admin", false)
            }
            { refreshPage() }
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid"> This field is required. </Form.Control.Feedback>

                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid"> This field is required. </Form.Control.Feedback>
                </Form.Group>
            </Row>


            <button type="submit" class="btn btn-primary"> Login </button>
            <button type="button" class="btn btn-success" onClick={handleShowAddOffice}> Register </button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>OK</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>User loged in</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={refreshPage}> OK </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddOffice} onHide={handleCloseAddOffice}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new organization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validatedAdd} onSubmit={handleAdd}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Org ID</Form.Label>
                                <Form.Control required type="text" placeholder="Organization ID"
                                    onChange={(e) => setOrgId(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" placeholder="Organization name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col}>
                                <Form.Label>Employees' Number</Form.Label>
                                <Form.Control required type="text" placeholder="Number of employees"
                                    onChange={(e) => setNumOfEmployees(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>PARKING'S NUMBER</Form.Label>
                                <Form.Control type="text" placeholder="Number of parking palces"
                                    onChange={(e) => setParkingAmount(e.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col}>
                                <Form.Label>FLOORS' NUMBER</Form.Label>
                                <Form.Control type="text" placeholder="Number of floors" required
                                    onChange={(e) => setFloorsAmount(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>ROOMS' NUMBER</Form.Label>
                                <Form.Control type="text" placeholder="Number of rooms" required
                                    onChange={(e) => setRoomsAmount(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Meetting Rooms' Number</Form.Label>
                                <Form.Control type="text" placeholder="Number of meetting rooms" required
                                    onChange={(e) => setMeetingRoomsAmount(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Office Capacity</Form.Label>
                                <Form.Control type="text" placeholder="Office capacity percentage" required
                                    onChange={(e) => setOfficeCapacity(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Row>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label>Open Space</label>
                                    <Form.Text className="text-muted"> Is the office is an open space? </Form.Text>
                                    <Form.Control
                                        as="select"
                                        className="openspace-select"
                                        id="openspace-select"
                                        style={{ width: '150px' }}
                                        onChange={(e) => setOpenSpace(e.target.value)}
                                    >
                                        <option value="Yse">Yse</option>
                                        <option value="No">No</option>
                                                ></Form.Control>
                                </Form.Group>
                            </Col>

                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label>HotSpots</label>
                                    <Form.Text className="text-muted"> Is there hotspots in the office? </Form.Text>
                                    <Form.Control
                                        as="select"
                                        className="hotspots-select"
                                        id="hotspots-select"
                                        style={{ width: '150px' }}
                                        onChange={(e) => setHotSpot(e.target.value)}
                                    >
                                        <option value="Yse">Yse</option>
                                        <option value="No">No</option>
                                                ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <button type="submit" class="btn btn-primary">Add Organizarion</button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showAddUser} onHide={handleCloseAddUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Admin User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validatedAddUser} onSubmit={handleAddUser}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>ID</Form.Label>
                                <Form.Control required type="text" placeholder="ID"
                                    onChange={(e) => setId(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>First name</Form.Label>
                                <Form.Control required type="text" placeholder="First name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control required type="text" placeholder="Last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="text" placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Car Number</Form.Label>
                                <Form.Control type="text" placeholder="Car Number"
                                    onChange={(e) => setCarNumber(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Floor</Form.Label>
                                <Form.Control type="text" placeholder="Floor" required
                                    onChange={(e) => setFloor(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Room Number</Form.Label>
                                <Form.Control type="text" placeholder="Room Number" required
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Role" required
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Department</Form.Label>
                                <Form.Control type="text" placeholder="Department" required
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Permission Level</Form.Label>
                                <Form.Control type="text" placeholder="Permission Level" required
                                    onChange={(e) => setPermissionLevel(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <button type="submit" class="btn btn-primary">Add User</button>
                    </Form>
                </Modal.Body>
            </Modal>

        </Form>
    );
}