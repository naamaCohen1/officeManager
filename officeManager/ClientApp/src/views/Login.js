import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";





function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   
    function validateForm() {
        //return username.length > 0 && password.length > 0;
        return true;
    }



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
        console.log(requestOptions);
        const response = await fetch("https://localhost:5001/api/login/", requestOptions)
        if (response.status != 200) {
            const data = await response.json();
            alert(data)
            event.preventDefault();
        }

        //event.preventDefault();
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
                        //onChange={setUsername()}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                </Form.Group>
                <Form.Group size="lg" controlId="ID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        //onChange={setPassword()}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button
                    block size="lg"
                    type="submit"
                    //disabled={!validateForm()}
                    >
                    Login
        </Button>
            </Form>
        </div>
    );
}

export default Login;