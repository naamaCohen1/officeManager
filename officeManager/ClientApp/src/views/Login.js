import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";





function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        console.log(requestOptions);
        fetch("https://localhost:44375/api/login/", requestOptions).then(response => console.log(response.status));
        console.log(data);
        console.log("on handel submit" + username);
        console.log("on handel submit" + password);
        event.preventDefault();
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="ID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button
                    block size="lg"
                    type="submit"
                    disabled={!validateForm()}
                    >
                    Login
        </Button>
            </Form>
        </div>
    );
}

export default Login;