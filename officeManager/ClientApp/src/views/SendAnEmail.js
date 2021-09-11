import React, { useEffect, useState, Component } from "react";
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

export default function SendAnEmail() {
    const [employeesArray, setEmployeesArray] = useState([]);
    const [dateEmployeesArray, setDateEmployeesArray] = useState([]);
    const [employeesEmails, setEmployeesEmails] = useState([]);
    const [orgID, setOrgID] = useState(sessionStorage.getItem("org_id"));
    const [date, setDate] = useState("");


    const [value, setValue] = useState(['orange', 'red'])

    // handle onChange event of the dropdown
    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(selectedValue)
    }

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [to, setTo] = useState("");
 
    const [validatedEdit, setValidatedEdit] = useState(false);

    const [message, setMessage] = useState();
    const [title, setTitle] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAll, setShowAll] = useState(false);
    const handleCloseAll = () => setShowAll(false);
    const handleShowAll = () => setShowAll(true);

    const [showSelectDate, setShowSelectDate] = useState(false);
    const handleCloseSelectDate = () => setShowSelectDate(false);
    const handleShowSelectDate = () => setShowSelectDate(true);

    const [showDate, setShowDate] = useState(false);
    const handleCloseShowDate = () => setShowDate(false);
    const handleShowDate = () => setShowDate(true);

    const handleSend = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            { sendEmail() }
        }
        setValidatedEdit(true);
    };

    async function getEmployees() {
        employeesArray.length = 0;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "http://officemanager.us-east-1.elasticbeanstalk.com/api/users/" + orgID;
        console.log(url)
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

                    employeesArray.push(dictionary)
                    employeesEmails.push(dictionary[3])
                }
            }
        }
    }

    async function sendEmail() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "toArray": to,
                "subject": subject,
                "body": body,
            })
        };
        var url = "http://officemanager.us-east-1.elasticbeanstalk.com/api/gmail";
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            setTitle("Info")
            setMessage("Email Was sent.")
            { handleShow() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to send email.")
            { handleShow() }
        }
    }
    
    async function getDate() {
        dateEmployeesArray.length = 0;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        var url = "http://officemanager.us-east-1.elasticbeanstalk.com/api/calendar/" + orgID + "/" + date;
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            var obj = JSON.parse(data)
            var dataChnage = obj["EmployeesArriving"]
            if (dataChnage == null) {
                dateEmployeesArray.length = 0;
            }
            if (dataChnage != null) {
                dataChnage = dataChnage.slice(0, -1)
                var employees = dataChnage.split(",")
                employees.forEach(employee => {
                    var arr = []
                    var id = getID(employee);
                    arr.push(id)
                    arr.push(employee)
                    dateEmployeesArray.push(arr)
                })
            }
        }
        else {
            dateEmployeesArray.length = 0;
        }
        handleCloseSelectDate();
        handleShowDate();
    }

    function getID(name) {
        name = name + ''
        var email = null
        var first = name.split(" ")[0].replace(" ", "")
        var last = name.split(" ")[1].replace(" ", "")

        employeesArray.forEach(employee => {
            if (employee[1] == first && employee[2] == last) {
                email = employee[3].trim()
            }
        })
        return email
    }

    useEffect(() => {
        getEmployees();
    }, []);


    return (
        <>
            <Container fluid>
                
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Body>
                                <Form noValidate validated={validatedEdit} onSubmit={handleSend}>
                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>To</Form.Label>
                                        </Form.Group>
                                        <Form.Group>
                                            <button type="button" class="btn btn-primary" onClick={handleShowSelectDate}>Get employees by date</button>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <button type="button" class="btn btn-primary" onClick={handleShowAll}>Gel All employees</button>
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Mail Subject</Form.Label>
                                            <Form.Control required type="text" placeholder="Please enter mail subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Mail Body</Form.Label>
                                            <textarea required class="form-control rounded-0" id="exampleFormControlTextarea1" rows="10" placeholder="Please enter mail body"
                                                value={body}
                                                onChange={(e) => setBody(e.target.value)}
                                            ></textarea>
                                            <Form.Control.Feedback type="invalid"> This field is required.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <button type="submit" class="btn btn-primary" >Send</button>
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

                <Modal show={showAll} onHide={handleCloseAll}>
                    <Modal.Header closeButton>
                        <Modal.Title>To</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="my_multiselect_field">
                                    <Form.Label>Please select the requested employees</Form.Label>
                                    <Form.Control as="select" multiple value={to} onChange={e => setTo([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                        {
                                            employeesArray.map(listitem => (
                                                <option value={listitem[3]}>{listitem[1] + " " + listitem[2]}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-primary" onClick={handleCloseAll}> OK </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showSelectDate} onHide={handleCloseSelectDate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select A Date</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="my_multiselect_field">
                                    <Form.Label>Please enter a date (MM.DD.YYYY)</Form.Label>
                                    <Form.Control type="text" placeholder="MM.DD.YYYY"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-primary" onClick={getDate}> OK </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDate} onHide={handleCloseShowDate}>
                    <Modal.Header closeButton>
                        <Modal.Title>To</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="my_multiselect_field">
                                    <Form.Label>Please select the requested employees</Form.Label>
                                    <Form.Control as="select" multiple value={to} onChange={e => setTo([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                        {
                                            dateEmployeesArray.map(listitem => (
                                                <option value={listitem[0]}>{listitem[1]}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-primary" onClick={handleCloseShowDate}> OK </button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}