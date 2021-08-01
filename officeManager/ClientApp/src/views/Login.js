import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showErr, setShowErr] = useState(false);
    const handleCloseErr = () => setShowErr(false);
    const handleShowErr = () => setShowErr(true);

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
                "username": email,
                "password": password
            })
        };

        const response = await fetch("https://localhost:44375/api/login/", requestOptions)
        if (response.status != 200) {
            { handleShowErr() }
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        This field is required.
          </Form.Control.Feedback>


                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        This field is required.
          </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <button type="submit" class="btn btn-primary"> Login </button>

                <Modal show={showErr} onHide={handleCloseErr}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Invalid Email or Password. Please try again</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseErr}>OK</Button>
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
            </Form>
    );
}

///// line ~151
//const [dates, setDates] = useState([]);

///// line ~165
//const [showDates, setShowDates] = useState(false);
//const handleCloseDates = () => setShowDates(false);
//const handleShowDates = () => setShowDates(true);

//async function showCommingDates() {
//    var id = "205666415"
//    const requestOptions = {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//            'Accept': 'application/json'
//        }
//    };
//    const response = await fetch("https://localhost:44375/api/calendar/" + id, requestOptions)
//    console.log(response)
//    if (response.status == 200) {
//        var datesArr = await response.json()
//        setDates(datesArr)
//        { handleShowDates() }
//    }
//    else {
//        //setTitle("Error")
//        //setMessage("Unexpected error! Fail to get comming to the office dates.")
//        { handleShow() }
//    }
//}


///// line ~413
//<Modal show={showDates} onHide={handleCloseDates}>
//    <Modal.Header closeButton>
//        <Modal.Title>Your Office Dates</Modal.Title>
//    </Modal.Header>
//    <Modal.Body>
//        <p>These are your scheduled days:</p>
//        {dates}
//    </Modal.Body>
//    <Modal.Footer>
//        <button type="button" class="btn btn-primary" onClick={handleCloseDates}> OK </button>
//    </Modal.Footer>
//</Modal>