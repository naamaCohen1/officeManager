import React, { useEffect, useState } from "react";
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

export default function Offices() {
    const [officesArray, setOfficesArray] = useState([]);
    const [message, setMessage] = useState();

    const [name, setName] = useState("");
    const [numOfEmployees, setNumOfEmployees] = useState("")
    const [parkingAmount, setParkingAmount] = useState("")
    const [floorsAmount, setFloorsAmount] = useState("")
    const [roomsAmount, setRoomsAmount] = useState("")
    const [meetingRoomsAmount, setMeetingRoomsAmount] = useState("")
    const [officeCapacity, setOfficeCapacity] = useState("")
    const [openSpace, setOpenSpace] = useState("");
    const [hotSpot, setHotSpot] = useState("")
    const [hotSpotPlaces, setHotSpotPlaces] = useState("")
    const [id, setID] = useState("")

    const [showWarning, setShowWarning] = useState(false);
    const handleCloseWarning = () => setShowWarning(false);
    const handleShowWarning = () => setShowWarning(true);

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    const [showErr, setShowErr] = useState(false);
    const handleCloseErr = () => setShowErr(false);
    const handleShowErr = () => setShowErr(true);

    const [showAddOffice, setShowAddOffice] = useState(false);
    const handleCloseAddOffice = () => setShowAddOffice(false);
    const handleShowAddOffice = () => setShowAddOffice(true);

    const [showEditOffice, setShowEditOffice] = useState(false);
    const handleCloseEditOffice = () => setShowEditOffice(false);
    const handleShowEditOffice = () => setShowEditOffice(true);

    const [validatedAdd, setValidatedAdd] = useState(false);
    const [validatedEdit, setValidatedEdit] = useState(false);

    async function refreshPage() {
        { handleCloseInfo() }
        window.location.reload();
    }

    async function getOffices() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "https://localhost:44375/api/offices/";
        handleRequest(url, requestOptions)
    }

    async function handleRequest(url, requestOptions) {
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            if (data != "null") {
                var dataChnage = data.replace("[", "")
                dataChnage = dataChnage.replace("]", "")
                var offices = dataChnage.split("},")
                var array = []
                for (var office in offices) {
                    var dictionary = []
                    var officeParams = (offices[office]).split(",")
                    for (var param in officeParams) {
                        var temp = officeParams[param].split(":")
                        temp[1] = temp[1].replace("}", "")
                        temp[1] = temp[1].replace("\"", "")
                        temp[1] = temp[1].replace("\"", "")
                        dictionary.push(temp[1].trim())
                    }
                    array.push(dictionary)
                }
                setOfficesArray(array)
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
            { EditOffice() }
        }
        setValidatedEdit(true);
    };

    async function handleEditOffice(value) {
        setName(value[0])
        setNumOfEmployees(value[1])
        setParkingAmount(value[2])
        setFloorsAmount(value[3])
        setRoomsAmount(value[4])
        setMeetingRoomsAmount(value[5])
        setOfficeCapacity(value[6])
        setOpenSpace(value[7])
        setHotSpot(value[8])
        setHotSpotPlaces(value[9])
        setID(value[10])
        { handleShowEditOffice() }
    }

    async function EditOffice() {
        { handleCloseEditOffice() }

        const requestOptions = {
            method: 'PUT',
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
                "openSpace": openSpace,
                "hotSpot": hotSpot,
                "hotSpotPlaces": hotSpotPlaces,
                "id": id
            })
        };
        var url = "https://localhost:44375/api/offices/" + id;
        const response = await fetch(url, requestOptions);
        if (response.status == 204) {
            setMessage("Office was updated.")
            { handleShowInfo() }
        }
        else {
            setMessage("Unexpected error! Fail to update office.")
            { handleShowErr() }
        }
    }

    async function handleDeleteOffice(value) {
        setID(value)
        setMessage("Do you really want to delete this office? This action can not be undone.")
        { handleShowWarning() }
    }

    async function deleteOffice() {
        { handleCloseWarning() }
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "https://localhost:44375/api/offices/" + id;
        const response = await fetch(url, requestOptions);
        if (response.status == 204) {
            setMessage("Office was Deleted.")
            { handleShowInfo() }
        }
        else {
            setMessage("Unexpected error! Fail to delete office.")
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
            { AddOffice() }
        }
        setValidatedAdd(true);
    };

    async function AddOffice() {
        { handleCloseAddOffice() }

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
                "openSpace": openSpace,
                "hotSpot": hotSpot,
                "hotSpotPlaces": hotSpotPlaces,
                "id": id
            })
        };
        var url = "https://localhost:44375/api/offices";
        const response = await fetch(url, requestOptions);
        if (response.status == 201) {
            setMessage("Office was Created.")
            { handleShowInfo() }
        }
        else {
            setMessage("Unexpected error! Fail to create Office.")
            { handleShowErr() }
        }
    }

    // Calling the function on component mount
    useEffect(() => {
        getOffices();
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="14">
                        <Card className="card-plain table-plain-bg">
                            <Card.Header>
                                <Card.Title as="h6" class="text-capitalize"> All Offices will be presented in this page.
                                    You can edit, add and delete offices.</Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <button type="button" class="btn btn-primary btn-sm" onClick={handleShowAddOffice}>
                                            Add Office
                                            </button>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Employees' Number</th>
                                            <th>Parking Places</th>
                                            <th>Floors' Amount</th>
                                            <th>Rooms' Amount</th>
                                            <th>Meeting Rooms' Amount</th>
                                            <th>Office Capacity</th>
                                            <th>Open Space</th>
                                            <th>Hot Spot</th>
                                            <th>Hot Spot Places </th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            officesArray.map((item) => (
                                                <tr key={item.id}>
                                                    <td style={{ fontSize: 12 }}>{item[10]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[0]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[1]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[2]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[3]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[4]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[5]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[6]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[7]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[8]}</td>
                                                    <td style={{ fontSize: 12 }}>{item[9]}</td>
                                                    <td>
                                                        <button type="button" class="btn btn-info btn-sm" value={item} onClick={() => handleEditOffice(item)}>
                                                            Edit
                                                            </button>
                                                    </td>
                                                    <td>
                                                        <button type="button" class="btn btn-danger btn-sm" value={item[10]} onClick={() => handleDeleteOffice(item[10])}>
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
                        <Button variant="danger" onClick={deleteOffice}>Yes</Button>
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

                <Modal show={showAddOffice} onHide={handleCloseAddOffice}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Office</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validatedAdd} onSubmit={handleAdd}>
                            <Row className="mb-3">

                                <Form.Group as={Col}>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type="text" placeholder="ID" required
                                        onChange={(e) => setID(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Numer Of Employees</Form.Label>
                                    <Form.Control required type="text" placeholder="Numer Of Employees"
                                        onChange={(e) => setNumOfEmployees(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Parking Amount</Form.Label>
                                    <Form.Control type="text" placeholder="Parking Amount"
                                        onChange={(e) => setParkingAmount(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Floors Amount</Form.Label>
                                    <Form.Control required type="text" placeholder="Floors Amount"
                                        onChange={(e) => setFloorsAmount(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Rooms Amount</Form.Label>
                                    <Form.Control type="text" placeholder="Rooms Amount"
                                        onChange={(e) => setRoomsAmount(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Meeting Rooms Amount</Form.Label>
                                    <Form.Control type="text" placeholder="Meeting Rooms Amount" required
                                        onChange={(e) => setMeetingRoomsAmount(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Office Capacity</Form.Label>
                                    <Form.Control type="text" placeholder="Office Capacity" required
                                        onChange={(e) => setOfficeCapacity(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Open Space</Form.Label>
                                    <Form.Control
                                        required
                                        as="select"
                                        className="hotSpot-select"
                                        id="hotSpot-select"
                                        style={{ width: '230x' }}
                                        value={openSpace}
                                        onChange={(e) => setOpenSpace(e.target.value)}
                                    >
                                        <option value="False">No</option>
                                        <option value="True">Yes</option>
                                                ></Form.Control>
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group as={Col}>
                                    <label>Hot Spot</label>
                                    <Form.Control
                                        required
                                        as="select"
                                        className="hotSpot-select"
                                        id="hotSpot-select"
                                        style={{ width: '230x' }}
                                        value={hotSpot}
                                        onChange={(e) => setHotSpot(e.target.value)}
                                    >
                                        <option value="False">No</option>
                                        <option value="True">Yes</option>
                                                ></Form.Control>
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Hot Spot Places</Form.Label>
                                    <Form.Control type="text" placeholder="Hot Spot Places"
                                        onChange={(e) => setHotSpotPlaces(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <button type="submit" class="btn btn-primary" >Add</button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showEditOffice} onHide={handleCloseEditOffice}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Office</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validatedEdit} onSubmit={handleEdit}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type="text" placeholder="ID" required
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Name"
                                        value={ name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Numer Of Employees</Form.Label>
                                    <Form.Control required type="text" placeholder="Numer Of Employees"
                                        value={numOfEmployees}
                                        onChange={(e) => setNumOfEmployees(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Parking Amount</Form.Label>
                                    <Form.Control type="text" placeholder="Parking Amount"
                                        value={parkingAmount}
                                        onChange={(e) => setParkingAmount(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Floors Amount</Form.Label>
                                    <Form.Control required type="text" placeholder="Floors Amount"
                                        value={floorsAmount}
                                        onChange={(e) => setFloorsAmount(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Rooms Amount</Form.Label>
                                    <Form.Control type="text" placeholder="Rooms Amount"
                                        value={roomsAmount}
                                        onChange={(e) => setRoomsAmount(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Meeting Rooms Amount</Form.Label>
                                    <Form.Control type="text" placeholder="Meeting Rooms Amount" required
                                        value={meetingRoomsAmount}
                                        onChange={(e) => setMeetingRoomsAmount(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Office Capacity</Form.Label>
                                    <Form.Control type="text" placeholder="Office Capacity" required
                                        value={officeCapacity}
                                        onChange={(e) => setOfficeCapacity(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Open Space</Form.Label>
                                    <Form.Control
                                        required
                                        as="select"
                                        className="hotSpot-select"
                                        id="hotSpot-select"
                                        style={{ width: '230x' }}
                                        value={openSpace}
                                        onChange={(e) => setOpenSpace(e.target.value)}
                                    >
                                        <option value="False">No</option>
                                        <option value="True">Yes</option>
                                                ></Form.Control>
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group as={Col}>
                                    <label>Hot Spot</label>
                                    <Form.Control
                                        required
                                        as="select"
                                        className="hotSpot-select"
                                        id="hotSpot-select"
                                        style={{ width: '230x' }}
                                        value={hotSpot}
                                        onChange={(e) => setHotSpot(e.target.value)}
                                    >
                                        <option value="False">No</option>
                                        <option value="True">Yes</option>
                                                ></Form.Control>
                                    <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Hot Spot Places</Form.Label>
                                    <Form.Control type="text" placeholder="Hot Spot Places"
                                        value={hotSpotPlaces}
                                        onChange={(e) => setHotSpotPlaces(e.target.value)}
                                    />
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