import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";

export default function OfficeInfo() {
    const [id, setId] = useState(sessionStorage.getItem("org_id"))
    const [name, setName] = useState("")
    const [numOfEmployees, setNumOfEmployees] = useState("")
    const [parkingAmount, setParkingAmount] = useState("")
    const [floorsAmount, setFloorsAmount] = useState("");
    const [roomsAmount, setRoomsAmount] = useState("");
    const [meetingRoomsAmount, setMeetingRoomsAmount] = useState("");
    const [officeCapacity, setOfficeCapacity] = useState("");
    const [openSpace, setOpenSpace] = useState("");
    const [hotSpot, setHotSpot] = useState("");
    const [hotSpotPlaces, setHotSpotPlaces] = useState([]);

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
            { editOffice() }
        }
        setValidatedEdit(true);
    };

    async function loadPage(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "https://localhost:44375/api/offices/" + id;
        handleRequest(url, requestOptions)
    }

    async function handleRequest(url, requestOptions) {
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            if (data != "null") {
                var dataChnage = data.replace("}", "")
                var params = dataChnage.split(",")
                var dictionary = []
                for (var index in params) {
                    var temp = params[index].split(":")
                    temp[1] = temp[1].replace("\"", "")
                    temp[1] = temp[1].replace("\"", "")
                    dictionary.push(temp[1].trim())
                }
                { showData(dictionary) }
            }
        }
    }

    function showData(dictionary) {
        var parking = dictionary[2]
        if (dictionary[2] === '' || dictionary[2] === 'null')
            parking = "0"

        var spots = dictionary[9]
        if (dictionary[9] === 'null')
            spots = ""

        var open = "Yes"
        if (dictionary[7] === 'False')
            open = "No"

        var hot = "Yes"
        if (dictionary[8] === 'False')
            hot = "No"

        setName(dictionary[0])
        setNumOfEmployees(dictionary[1])
        setParkingAmount(parking)
        setFloorsAmount(dictionary[3])
        setRoomsAmount(dictionary[4])
        setMeetingRoomsAmount(dictionary[5])
        setOfficeCapacity(dictionary[6])
        setOpenSpace(open)
        setHotSpot(hot)
        setHotSpotPlaces(spots)
        setId(dictionary[10])
    }

    async function editOffice(event) {
        var open = "False"
        if (openSpace === 'Yes')
            open = "True"

        var hot = "False"
        if (hotSpot === 'Yes')
            hot = "True"

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
                "openSpace": open,
                "hotSpot": hot,
                "hotSpotPlaces": hotSpotPlaces,
                "id": id
            })
        };
        var response = await fetch("https://localhost:44375/api/offices/" + id, requestOptions);
        if (response.status == 204) {
            setTitle("Info")
            setMessage("Organiztion was updated.")
            { handleShow() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to update organization.")
            { handleShow() }
        }
    }

    useEffect(() => {
        loadPage(id);
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Body>
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
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter the organization name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">

                                        <Form.Group as={Col}>
                                            <Form.Label>Employees' Number</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter the number of employees"
                                                value={numOfEmployees}
                                                onChange={(e) => setNumOfEmployees(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>PARKING'S NUMBER</Form.Label>
                                            <Form.Control type="text" placeholder="Enter the number of parking palces"
                                                value={parkingAmount}
                                                onChange={(e) => setParkingAmount(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">

                                        <Form.Group as={Col}>
                                            <Form.Label>FLOORS' NUMBER</Form.Label>
                                            <Form.Control type="text" placeholder="Enter the number of floors" required
                                                value={floorsAmount}
                                                onChange={(e) => setFloorsAmount(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>ROOMS' NUMBER</Form.Label>
                                            <Form.Control type="text" placeholder="Enter the number of rooms in the office" required
                                                value={roomsAmount}
                                                onChange={(e) => setRoomsAmount(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Meetting Rooms' Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter the number of meetting rooms in the office" required
                                                value={meetingRoomsAmount}
                                                onChange={(e) => setMeetingRoomsAmount(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Office Capacity</Form.Label>
                                            <Form.Control type="text" placeholder="Enter the allowed office capacity percentage" required
                                                value={officeCapacity}
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
                                                    style={{ width: '265px' }}
                                                    value={openSpace}
                                                    onChange={(e) => setOpenSpace(e.target.value)}
                                                >
                                                    <option value="Yes">Yes</option>
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
                                                    style={{ width: '265px' }}
                                                    value={hotSpot}
                                                    onChange={(e) => setHotSpot(e.target.value)}
                                                >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <button type="submit" class="btn btn-primary" >Save Changes</button>
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