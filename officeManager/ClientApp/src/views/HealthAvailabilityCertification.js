import React, { useState } from "react";

// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Table,
} from "react-bootstrap";

function HealthAvailabilityCertification() {
    const [id, setId] = React.useState(sessionStorage.getItem("id"));
    const [validatedSubmit, setValidatedSubmit] = useState(false);

    const [message, setMessage] = useState();
    const [title, setTitle] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event) {
        console.log("handel")
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("if")
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            console.log("else")
            event.preventDefault();
            { editEmployee() }
        }

        setValidatedSubmit(true);
    };

    async function editEmployee() {
        //const requestOptions = {
        //    method: 'PUT',
        //    headers: {
        //        'Content-Type': 'application/json',
        //        'Accept': 'application/json'
        //    },
        //    body: JSON.stringify({
        //        "id": id,
        //        "firstName": firstName,
        //        "lastName": lastName,
        //        "email": email,
        //        "carNumber": carNumber,
        //        "floor": floor,
        //        "roomNumber": roomNumber,
        //        "role": role,
        //        "department": department,
        //        "permissionLevel": permission
        //    })
        //};
        //var response = await fetch("https://localhost:44375/api/users/" + id, requestOptions);
        var response = 204
        if (response.status == 204) {
            setTitle("Info")
            setMessage("Health Availability Certification was sent to HR.")
            { handleShow() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to send Health Availability Certification to HR.")
            { handleShow() }
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="card-tasks">
                            <Card.Header>
                                <Card.Title as="h4">Health  Availability Certification</Card.Title>
                                <p className="card-category">Your ID will be recorded when you submit this form.</p>
                            </Card.Header>
                            <Card.Body>
                                <Form noValidate validated={validatedSubmit} onSubmit={handleSubmit}>
                                    <Table >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                required
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td> I am not currently showing any signs of COVID-19 including coughing? </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                required
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td> In the past week, I have not had and currently do not have a body temperature above 38° C/100.4° F? </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                required
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td> I have not been in close contact with someone who has tested positive for COVID-19
                                                    in the past 14 days? </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                required
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td> I have read and understand the requirements for office use outlined by the
                                                    CRT and have read and understand any additional building and government requirements. </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                required
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td> I understand that any office use is strictly voluntary and not a requirement. </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                required
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                            <Form.Control.Feedback type="invalid">This field is required.</Form.Control.Feedback>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td> I confirm that the information I have entered is correct and voluntarily provided.
                                                I also understand that I must notify the company and discontinue office use if any of
                                                my responses change during my scheduled time. If so, I may not use office space again
                                                    until I am able to certify the above statements are true. </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default HealthAvailabilityCertification;