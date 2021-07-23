import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isClicked = false;

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} className="mb-3">

                    <InputGroup >
                        <DropdownButton
                            variant="outline-secondary"
                            title="Search By"
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item href="#">Employee Name</Dropdown.Item>
                            <Dropdown.Item href="#">Department</Dropdown.Item>
                            <Dropdown.Item href="#">Floor</Dropdown.Item>
                        </DropdownButton>
                        <FormControl aria-label="Text input with dropdown button" value={this.state.value} onChange={this.handleChange} />
                    </InputGroup>




                </Form.Group>
            </Form>

        );
    }
}





export default function Results() {
    // set states of calendar date
    const [calDate, setCalDate] = useState(new Date())
    const [DateIsClick, setDateIsClick] = useState(false);
    const [people, setPeople] = useState([]);


    function showSearchBar() {
        let button;
        if (DateIsClick) {
            button = <NameForm></NameForm>;
        }
        return button;
    }

    function showAddButton() {
        if (DateIsClick) {
            return (
                <>
                    <Button variant="primary" style={{ margin: '10px' }} onClick={clickSubmit} >Submit</Button>
                    <Button variant="dark" onClick={clickRemove} >Remove</Button>
                </>
            )
        }
    }

    async function onChange(calDate) {
        setCalDate(calDate)
        var newCalDateFormat = calDate.toLocaleString().split(",")[0]
        setDateIsClick(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        newCalDateFormat = newCalDateFormat.replace('/', '.')
        newCalDateFormat = newCalDateFormat.replace('/', '.')
        console.log(newCalDateFormat)
        var url = "https://localhost:5001/api/calendar/" + newCalDateFormat;
        handleRequest(url, requestOptions)
    }


    async function handleRequest(url, requestOptions) {
        var peopleList = []
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            console.log("in the if")
            const data = await response.json();
            console.log(data)
            var dataChnage = data.replace('[', '')
            dataChnage = dataChnage.replace(']', '')
            dataChnage = dataChnage.replaceAll('"', '')
            console.log(dataChnage)
            if (dataChnage != "null") {
                console.log("naama")
                peopleList = dataChnage.split(",")
                setPeople(peopleList)
            }



        }
        else {

        }

    }
    async function clickSubmit() {
        console.log("clickSubmit()")
        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        console.log(newCalDateFormat)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "date": newCalDateFormat,
                "id": "204049316"
            })
        };
        setDateIsClick(true)
        console.log(requestOptions)
        handleRequest("https://localhost:5001/api/calendar", requestOptions)
    }

    async function clickRemove() {
        console.log("clickRemove()")
        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        console.log(newCalDateFormat)
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "date": newCalDateFormat,
                "id": "204049316"
            })
        };
        setDateIsClick(true)
        console.log(requestOptions)
        handleRequest("https://localhost:5001/api/calendar", requestOptions)
    }

    function showPeopleCame() {
        return (
            < React.Fragment >
                <ListGroup>
                    {people.map(listitem => (
                        <ListGroup.Item sm='4'>
                            {listitem}
                        </ListGroup.Item >
                    ))}
                </ListGroup>
            </React.Fragment >
        );

    }

    return (
        <div className="result-calendar" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Calendar onChange={onChange} value={calDate} />
            {showSearchBar()}

            <div style={{ position: 'absolute', left: '15px', top: '420px', width: '300px' }}>
                <Container fluid="md">
                    {showAddButton()}
                    {showPeopleCame()}
                </Container>
            </div>
        </div>
    )

}

//export default CommingToOffice;
Showing  with 786 additions and 345 deletions.
 363  officeManager / ClientApp / src / views / CommingToOffice.js
@@ -1, 206 + 1, 207 @@
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isClicked = false;

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    //import React, {useState} from 'react';
//import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
//import ListGroup from 'react-bootstrap/ListGroup';
//import Container from 'react-bootstrap/Container';
//import InputGroup from 'react-bootstrap/InputGroup';
//import DropdownButton from 'react-bootstrap/DropdownButton';
//import Dropdown from 'react-bootstrap/Dropdown';
//import FormControl from 'react-bootstrap/FormControl';
//import Row from 'react-bootstrap/Row';

//class NameForm extends React.Component {
                        //    constructor(props) {
                        //        super(props);
                        //        this.state = { value: '' };
                        //        this.handleChange = this.handleChange.bind(this);
                        //        this.handleSubmit = this.handleSubmit.bind(this);
                        //        this.isClicked = false;

                        //    }

                        //    handleChange(event) {
                        //        this.setState({ value: event.target.value });
                        //    }

                        //    handleSubmit(event) {
                        //        alert('A name was submitted: ' + this.state.value);
                        //        event.preventDefault();
                        //    }

                        //    render() {
                        //        return (
                        //            <Form onSubmit={this.handleSubmit}>
                        //                <Form.Group as={Row} className="mb-3">

                        <InputGroup >
                            <DropdownButton
                                variant="outline-secondary"
                                title="Search By"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item href="#">Employee Name</Dropdown.Item>
                                <Dropdown.Item href="#">Department</Dropdown.Item>
                                <Dropdown.Item href="#">Floor</Dropdown.Item>
                            </DropdownButton>
                            <FormControl aria-label="Text input with dropdown button" value={this.state.value} onChange={this.handleChange} />
                        </InputGroup>
//                    <InputGroup >
                        //                        <DropdownButton
//                            variant="outline-secondary"
//                            title="Search By"
//                            id="input-group-dropdown-1"
//                        >
//                            <Dropdown.Item href="#">Employee Name</Dropdown.Item>
//                            <Dropdown.Item href="#">Department</Dropdown.Item>
//                            <Dropdown.Item href="#">Floor</Dropdown.Item>
//                        </DropdownButton>
//                        <FormControl aria-label="Text input with dropdown button" value={this.state.value} onChange={this.handleChange} />
//                    </InputGroup>




                </Form.Group>
            </Form>
//                </Form.Group>
//            </Form>

        );
    }
}
//        );
//    }
//}





export default function Results() {
    // set states of calendar date
    const [calDate, setCalDate] = useState(new Date())
    const [DateIsClick, setDateIsClick] = useState(false);
    const [people, setPeople] = useState([]);
    //export default function Results() {
    //    // set states of calendar date
    //    const [calDate, setCalDate] = useState(new Date())
    //    const [DateIsClick, setDateIsClick] = useState(false);
    //    const [people, setPeople] = useState([]);


    function showSearchBar() {
        let button;
        if (DateIsClick) {
            button = <NameForm></NameForm>;
        }
        return button;
    }
    //    function showSearchBar() {
    //        let button;
    //        if (DateIsClick) {
    //            button = <NameForm></NameForm>;
    //        } 
    //        return button;
    //    }

    function showAddButton() {
        if (DateIsClick) {
            return (
                <>
                    <Button variant="primary" style={{ margin: '10px' }} onClick={clickSubmit} >Submit</Button>
                    <Button variant="dark" onClick={clickRemove} >Remove</Button>
                </>
            )
        }
    }
    //    function showAddButton() {
    //        if (DateIsClick) {
    //            return (
    //            <>
    //             <Button variant="primary" style={{margin: '10px'}}  onClick={clickSubmit} >Submit</Button>
    //             <Button variant="dark" onClick={clickRemove} >Remove</Button>
    //            </>
    //            )
    //        } 
    //    }

    async function onChange(calDate) {
        setCalDate(calDate)
        var newCalDateFormat = calDate.toLocaleString().split(",")[0]
        setDateIsClick(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        newCalDateFormat = newCalDateFormat.replace('/', '.')
        newCalDateFormat = newCalDateFormat.replace('/', '.')
        console.log(newCalDateFormat)
        var url = "https://localhost:5001/api/calendar/" + newCalDateFormat;
        handleRequest(url, requestOptions)
    }


    async function handleRequest(url, requestOptions) {
        var peopleList = []
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            console.log("in the if")
            const data = await response.json();
            console.log(data)
            var dataChnage = data.replace('[', '')
            dataChnage = dataChnage.replace(']', '')
            dataChnage = dataChnage.replaceAll('"', '')
            console.log(dataChnage)
            if (dataChnage != "null") {
                console.log("naama")
                peopleList = dataChnage.split(",")
                setPeople(peopleList)
            }
            //    async function  onChange(calDate) {
            //        setCalDate(calDate)
            //        var newCalDateFormat = calDate.toLocaleString().split(",")[0]   
            //        setDateIsClick(true)
            //        const requestOptions = {
            //            method: 'GET',
            //            headers: {
            //                'Content-Type': 'application/json',
            //                'Accept': 'application/json'
            //            }
            //        };
            //        newCalDateFormat = newCalDateFormat.replace('/', '.')
            //        newCalDateFormat = newCalDateFormat.replace('/', '.')
            //        console.log(newCalDateFormat)
            //        var url = "https://localhost:44375/api/calendar/" + newCalDateFormat;
            //        handleRequest(url, requestOptions)
            //    }


            //    async function handleRequest(url, requestOptions) {
            //        var peopleList = []
            //        const response = await fetch(url, requestOptions);
            //        if (response.status == 200) {
            //            console.log("in the if")
            //            const data = await response.json();
            //            console.log(data)
            //            var dataChnage = data.replace('[', '')
            //            dataChnage = dataChnage.replace(']', '')
            //            dataChnage = dataChnage.replaceAll('"', '')
            //            console.log(dataChnage)
            //            if (dataChnage != "null") {
            //                console.log("naama")
            //                peopleList = dataChnage.split(",")
            //                setPeople(peopleList)
            //            }



        }
        else {
            //        }
            //        else {

        }
        //        }

    }
    async function clickSubmit() {
        console.log("clickSubmit()")
        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        console.log(newCalDateFormat)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "date": newCalDateFormat,
                "id": "204049316"
            })
        };
        setDateIsClick(true)
        console.log(requestOptions)
        handleRequest("https://localhost:5001/api/calendar", requestOptions)
    }

    async function clickRemove() {
        console.log("clickRemove()")
        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        console.log(newCalDateFormat)
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "date": newCalDateFormat,
                "id": "204049316"
            })
        };
        setDateIsClick(true)
        console.log(requestOptions)
        handleRequest("https://localhost:5001/api/calendar", requestOptions)
    }

    function showPeopleCame() {
        return (
            < React.Fragment >
                <ListGroup>
                    {people.map(listitem => (
                        <ListGroup.Item sm='4'>
                            {listitem}
                        </ListGroup.Item >
                    ))}
                </ListGroup>
            </React.Fragment >
        );
        //    }
        //    async function clickSubmit() {
        //        console.log("clickSubmit()")
        //        const newCalDateFormat = calDate.toLocaleString().split(",")[0]  
        //        console.log(newCalDateFormat)
        //        const requestOptions = {
        //            method: 'POST',
        //            headers: {
        //                'Content-Type': 'application/json',
        //                'Accept': 'application/json'
        //            },
        //            body: JSON.stringify({
        //                "date": newCalDateFormat,
        //                "id": "204049316"
        //            })
        //        };
        //        setDateIsClick(true)
        //        console.log(requestOptions)
        //        handleRequest("https://localhost:44375/api/calendar", requestOptions)
        //    }

        //    async function clickRemove() {
        //        console.log("clickRemove()")
        //        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        //        console.log(newCalDateFormat)
        //        const requestOptions = {
        //            method: 'DELETE',
        //            headers: {
        //                'Content-Type': 'application/json',
        //                'Accept': 'application/json'
        //            },
        //            body: JSON.stringify({
        //                "date": newCalDateFormat,
        //                "id": "204049316"
        //            })
        //        };
        //        setDateIsClick(true)
        //        console.log(requestOptions)
        //        handleRequest("https://localhost:44375/api/calendar", requestOptions)
        //    }

        //    function showPeopleCame() {
        //        return (
        //            < React.Fragment >
        //                <ListGroup>
        //                    {people.map(listitem => (
        //                        <ListGroup.Item sm='4'>
        //                            {listitem}
        //                        </ListGroup.Item >
        //                    ))}
        //                </ListGroup>
        //            </React.Fragment >
        //        );

    }
    //    }

    return (
        <div className="result-calendar" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Calendar onChange={onChange} value={calDate} />
            {showSearchBar()}
//    return (
//        <div className="result-calendar" style={{ display: 'flex', justifyContent: 'space-between' }}>
                //            <Calendar onChange={onChange} value={calDate} />
//            {showSearchBar()}

                <div style={{ position: 'absolute', left: '15px', top: '420px', width: '300px' }}>
                    <Container fluid="md">
                        {showAddButton()}
                        {showPeopleCame()}
                    </Container>
                </div>
            </div>
    )
//            <div style={{ position: 'absolute', left: '15px', top: '420px', width: '300px' }}>
                //                <Container fluid="md">
                    //            {showAddButton()}
//            {showPeopleCame()}
//                </Container>
//            </div>
//        </div>
//    )

}
//}

//////export default CommingToOffice;

//export default CommingToOffice;
72  officeManager / ClientApp / src / views / Login.js
@@ -1, 19 + 1, 33 @@
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function Login() {
    export default function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [show, setShow] = useState(false);
        const [showErr, setShowErr] = useState(false);
        const [validated, setValidated] = useState(false);

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const [showErr, setShowErr] = useState(false);
        const handleCloseErr = () => setShowErr(false);
        const handleShowErr = () => setShowErr(true);

        async function handleSubmit(event) {
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

            async function login() {
                const requestOptions = {
                    method: 'POST',
                    headers: {
@@ -25, 45 + 39, 48 @@function Login() {
                    "password": password
                })
            };
            console.log(requestOptions);

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
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        required
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}

                                    />
                                </Form.Group>
                                <Form.Group size="lg" controlId="ID">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control.Feedback type="invalid">
                                        This field is required.
          </Form.Control.Feedback>


                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
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
                                <button type="button"
                                    class="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    Login
                  </button>
                            </Row>

                            <button type="submit" class="btn btn-primary"> Login </button>

                            <Modal show={showErr} onHide={handleCloseErr}>
                                <Modal.Header closeButton>
                                    @@ -82,15 +99,12 @@ function Login() {
                                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                                <Modal.Body>
                                    <p>Loged In successfully</p>
                                    <p>User loged in</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose}>OK</Button>
                                    <Modal.Footer>
                                        <button type="button" class="btn btn-primary" onClick={handleClose}> OK </button>
                                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );
}

export default Login;
 656  officeManager/ClientApp/src/views/OfficeEmployees.js
Large diffs are not rendered by default.

  19  officeManager/ClientApp/src/views/UserProfile.js
@@ -1,4 +1,4 @@
import React, {useState} from "react";
import React, {useEffect, useState} from "react";
// react-bootstrap components
import {
                            Button,
@@ -47,10 +47,8 @@ export default function User() {
                            async function handleRequest(url, requestOptions) {
                                const response = await fetch(url, requestOptions);
                                if (response.status == 200) {
                                    console.log("in the if")
                                    const data = await response.json();
                                    if (data != "null") {
                                        console.log(data)
                                        var dataChnage = data.replace("}", "")
                                        var params = dataChnage.split(",")
                                        var dictionary = []
                                        @@ -61, 6 + 59, 11 @@ export default function User() {
                                            dictionary.push(temp[1].trim())
                                        }

                                        if (dictionary[8] == 0)
                                            dictionary[8] = "ADMINISTRATOR"
                                        else
                                            dictionary[8] = "STANDARD"

                                        setId(dictionary[0])
                                        setFirstName(dictionary[1])
                                        setLastName(dictionary[2])
                                        @@ -69, 8 + 72, 8 @@ export default function User() {
                                            setFloor(dictionary[5])
                                            setRoomNumber(dictionary[6])
                                            setRole(dictionary[7])
                                            setPermissionLevel(dictionary[8])
                                            setDepartment(dictionary[9])
                                            setPermissionLevel(dictionary[8])
                                        }
                                    }
                                }
                                @@ -92, 9 + 95, 9 @@ export default function User() {
                                    "floor": floor,
                "roomNumber": roomNumber,
                "role": role,
                "permissionLevel": "0",
                "department": department,
                "permissionLevel": "0"
                //"permissionLevel": permissionLevel,
                "department": department
            })
        };
        var response = await fetch("https://localhost:44375/api/users/" + "205666415", requestOptions);
@@ -109,6 +112,10 @@ export default function User() {
                        }
    }

    useEffect(() => {
                            loadPage("205666415");
    }, []);

    return (
        <>
                            <Container fluid>
                                13  officeManager/Controllers/Entities/ePermissionLevel.cs
                                @@ -0,0 +1,13 @@
                                using System;
                                using System.Collections.Generic;
                                using System.Linq;
                                using System.Threading.Tasks;

                                namespace officeManager.Controllers.Entities
{
                                    public enum ePermissionLevel
    {
                                    ADMINISTRATOR,
                                    STANDARD
                                }
}
  4  officeManager/Controllers/usersController.cs
@@ -192,9 +192,9 @@ public async Task<IActionResult> Put([FromBody] User updated_user, string id)
        public async Task<IActionResult> Delete(string id)
        {
            var user = Get(id);
            if (user.Result.ToString().Contains("NotFoundResult"))
            if (user.Result.Result.ToString().Contains("NotFoundResult"))
                return new NotFoundObjectResult("User with ID [" + id + "] was not found");
            if (!user.Result.ToString().Contains("OkObjectResult"))
            if (!user.Result.Result.ToString().Contains("OkObjectResult"))
                return new BadRequestResult();

            string sql = string.Format("DELETE FROM tlbEmployees WHERE ID={0}", id);
            try
            {
                                            SqlConnection connection = new SqlConnection(connetionString);
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
                command.Dispose();
                connection.Close();
                return NoContent();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}