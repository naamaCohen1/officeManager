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

export default function SendAnEmail() {
    const [employeesArray, setEmployeesArray] = useState([]);
    const [employeesEmails, setEmployeesEmails] = useState([]);
    const [orgID, setOrgID] = useState(sessionStorage.getItem("org_id"));

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [to, setTo] = useState("");

    const [validatedEdit, setValidatedEdit] = useState(false);

    const [message, setMessage] = useState();
    const [title, setTitle] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                console.log(employeesEmails)
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
        var url = "https://localhost:44375/api/gmail";
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
    
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Send An Email </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form noValidate validated={validatedEdit} onSubmit={handleSend}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="my_multiselect_field">
                                            <Form.Label>To</Form.Label>
                                            <Form.Control as="select" multiple value={to} onChange={e => setTo([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                                <option value="All">Show All</option>
                                                {
                                                    employeesArray.map(listitem => (
                                                        <option value={listitem[3]}>{listitem[1] + " " + listitem[2]}</option>
                                                    ))
                                                }
                                            </Form.Control>
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
                                            <Form.Control required type="text" placeholder="Please enter mail body"
                                                value={body}
                                                onChange={(e) => setBody(e.target.value)}
                                            />
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
            </Container>
        </>
    );
}