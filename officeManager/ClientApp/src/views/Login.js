import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

export default function Login() {
    const [username, setUsername] = useState("");
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
        window.location.reload();
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
            { handleShowErr() }
        }
        else {
            sessionStorage.setItem("id", password)
            var permission = await response.json()
            if (permission == 0) {
                sessionStorage.setItem("admin", true)
            }
            sessionStorage.setItem("admin", false)
            { handleShow() }
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        This field is required.
          </Form.Control.Feedback>


                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="text"
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
                        <p>Invalid Username or Password. Please try again</p>
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
