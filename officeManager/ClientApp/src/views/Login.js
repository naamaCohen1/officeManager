import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [showErr, setShowErr] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseErr = () => setShowErr(false);
    const handleShowErr = () => setShowErr(true);

    async function handleSubmit(event) {
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
            { handleShow() }
        }

        event.preventDefault();
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="ID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <button type="button"
                    class="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Login
                  </button>

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
                        <p>Loged In successfully</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );
}

export default Login;