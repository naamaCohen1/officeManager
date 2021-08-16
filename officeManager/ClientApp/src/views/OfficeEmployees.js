import React, { useEffect, useState } from "react";
import axios from 'axios';

// react-bootstrap components
import {
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
    Modal,
    Form
} from "react-bootstrap";

export default function OfficeEmployees() {
    const [orgID, setOrgID] = useState(sessionStorage.getItem("org_id"));
    const [employeesArray, setEmployeesArray] = useState([]);
    const [message, setMessage] = useState();

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
    const [fileName, setFileName] = useState("")

    const [showWarning, setShowWarning] = useState(false);
    const handleCloseWarning = () => setShowWarning(false);
    const handleShowWarning = () => setShowWarning(true);

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    const [showErr, setShowErr] = useState(false);
    const handleCloseErr = () => setShowErr(false);
    const handleShowErr = () => setShowErr(true);

    const [showAddUser, setShowAddUser] = useState(false);
    const handleCloseAddUser = () => setShowAddUser(false);
    const handleShowAddUser = () => setShowAddUser(true);

    const [showEditUser, setShowEditUser] = useState(false);
    const handleCloseEditUser = () => setShowEditUser(false);
    const handleShowEditUser = () => setShowEditUser(true);

    const [validatedAdd, setValidatedAdd] = useState(false);
    const [validatedEdit, setValidatedEdit] = useState(false);

    async function refreshPage() {
        { handleCloseInfo() }
        //window.location.reload();
        getEmployees()
    }

    async function getEmployees() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "https://localhost:44375/api/users/" + orgID;
        handleRequest(url, requestOptions)
    }

    async function handleRequest(url, requestOptions) {
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            if (data != "null") {
                var dataChnage = data.replace("[", "")
                dataChnage = dataChnage.replace("]", "")
                var employees = dataChnage.split("},")
                var array = []
                for (var employee in employees) {
                    var dictionary = []
                    var employeeParams = (employees[employee]).split(",")
                    for (var param in employeeParams) {
                        var temp = employeeParams[param].split(":")
                        temp[1] = temp[1].replace("}", "")
                        temp[1] = temp[1].replace("\"", "")
                        temp[1] = temp[1].replace("\"", "")
                        dictionary.push(temp[1].trim())
                    }
                    if (dictionary[8] == 0)
                        dictionary[8] = "ADMINISTRATOR"
                    else
                        dictionary[8] = "STANDARD"

                    array.push(dictionary)
                }
                setEmployeesArray(array)
            }
        }
    }

    const handleEdit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            { EditEmployee() }
        }
        setValidatedEdit(true);
    };

    async function handleEditEmployee(value) {
        setId(value[0])
        setFirstName(value[1])
        setLastName(value[2])
        setEmail(value[3])
        setCarNumber(value[4])
        setFloor(value[5])
        setRoomNumber(value[6])
        setRole(value[7])
        setDepartment(value[9])
        setPermissionLevel(value[8])
        { handleShowEditUser() }
    }

    async function EditEmployee() {
        { handleCloseEditUser() }

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
                "permissionLevel": permissionLevel,
                "orgid": orgID
            })
        };
        var url = "https://localhost:44375/api/users/" + orgID + "/" + id;
        const response = await fetch(url, requestOptions);
        if (response.status == 204) {
            setMessage("Employee was updated.")
            { handleShowInfo() }
        }
        else {
            setMessage("Unexpected error! Fail to delete employee.")
            { handleShowErr() }
        }
    }

    async function handleDeleteEmployee(value) {
        setId(value)
        setMessage("Do you really want to delete this employee? This action can not be undone.")
        { handleShowWarning() }
    }

    async function deleteEmployee() {
        { handleCloseWarning() }
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "https://localhost:44375/api/users/" + orgID + "/" + id;
        const response = await fetch(url, requestOptions);
        if (response.status == 204) {
            setMessage("Employee was Deleted.")
            { handleShowInfo() }
        }
        else {
            setMessage("Unexpected error! Fail to delete employee.")
            { handleShowErr() }
        }
    }

    const handleAdd = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            { AddEmployee() }
        }
        setValidatedAdd(true);
    };

    async function AddEmployee() {
        { handleCloseAddUser() }

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
                "permissionLevel": permissionLevel,
                "department": department,
                "orgid": orgID
            })
        };
        var url = "https://localhost:44375/api/users";
        const response = await fetch(url, requestOptions);
        if (response.status == 201) {
            setMessage("Employee was Created.")
            { handleShowInfo() }
        }
        else {
            setMessage("Unexpected error! Fail to create employee.")
            { handleShowErr() }
        }
    }

    function sendFile() {
        const data = new FormData()
        console.log(fileName)
        data.append('file', fileName)
        console.log(data)
        console.log("https://localhost:44375/api/upload")
        axios.post("https://localhost:44375/api/upload", data, { // receive two parameter endpoint url ,form data 
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.status == 200) {
                setMessage("Employees were added")
                handleShowInfo()
            }
            else if (res.status == 204) {
                setMessage("File is Empty or was not selected, Please try again.")
                { handleShowInfo() }
            }
            else {
                setMessage("Fail to load employees from file")
                { handleShowErr() }
            }
        })
    };

    // Calling the function on component mount
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <>
            <Container fluid>

                <Row>
                    <Col md="14">
                        <Card className="card-plain table-plain-bg">
                            <Card.Header>
                                <Card.Title as="h6" class="text-capitalize">
                                    All employees will be presented in this page.
                                    You can edit, add and delete employees.
                                    </Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">

                                <Card>
                                    <Card.Body>
                                        <Form>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formFile" md="3">
                                                    <Form.Label>Upload employees from file</Form.Label>
                                                    <Form.Control type="file" onChange={(e) => setFileName(e.target.files[0])} />
                                                </Form.Group>
                                                <Button type="button" class="btn btn-primary btn-sm" onClick={sendFile}>Load</Button>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Body>
                                        <Table className="table-hover">
                                            <thead>
                                                <button type="button" class="btn btn-primary btn-sm" onClick={handleShowAddUser}>
                                                    Add Employee
                                            </button>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Car Number</th>
                                                    <th>Floor</th>
                                                    <th>Room Number</th>
                                                    <th>Role</th>
                                                    <th>Department</th>
                                                    <th>Permission Level</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    employeesArray.map((item) => (
                                                        <tr key={item.id}>
                                                            <td style={{ fontSize: 12 }}>{item[0]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[1]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[2]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[3]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[4]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[5]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[6]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[7]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[9]}</td>
                                                            <td style={{ fontSize: 12 }}>{item[8]}</td>
                                                            <td>
                                                                <button type="button" class="btn btn-info btn-sm" value={item} onClick={() => handleEditEmployee(item)}>
                                                                    Edit
                                                            </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" class="btn btn-danger btn-sm" value={item[0]} onClick={() => handleDeleteEmployee(item[0])}>
                                                                    Delete
                                                            </button>
                                                            </td>
                                                            <td />
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Modal show={showWarning} onHide={handleCloseWarning}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={deleteEmployee}>Yes</Button>
                        <Button variant="secondary" onClick={handleCloseWarning}>No</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showInfo} onHide={handleCloseInfo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={refreshPage}>OK</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showErr} onHide={handleCloseErr}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseErr}>OK</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showAddUser} onHide={handleCloseAddUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validatedAdd} onSubmit={handleAdd}>
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
                                    <label>Permission Level</label>
                                    <Form.Control
                                        required
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

                            <button type="submit" class="btn btn-primary" >Add</button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showEditUser} onHide={handleCloseEditUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validatedEdit} onSubmit={handleEdit}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control required type="text" placeholder="ID"
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

                                <Form.Group as={Col}>
                                    <label>Permission Level</label>
                                    <Form.Control
                                        required
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
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}