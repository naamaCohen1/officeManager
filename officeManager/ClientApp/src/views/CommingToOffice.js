import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import Form from 'react-bootstrap/Form';
//import ListGroup from 'react-bootstrap/ListGroup';
//import Container from 'react-bootstrap/Container';
//import InputGroup from 'react-bootstrap/InputGroup';
//import DropdownButton from 'react-bootstrap/DropdownButton';
//import Dropdown from 'react-bootstrap/Dropdown';
//import FormControl from 'react-bootstrap/FormControl';
//import Row from 'react-bootstrap/Row';
import {
    Button,
    Card,
    ListGroup,
    Container,
    Row,
    Col,
    Modal,
    Form,
    InputGroup,
    DropdownButton,
    Dropdown,
    FormControl
} from "react-bootstrap";

var date;

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', label: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({ value: value });
        console.log(value)
        
    }

    async handleSubmit(event) {
        console.log(date)
        console.log("in handleSubmit")
        console.log(this.state.label)
        console.log(this.state.value)
        if (this.state.label == '') {
            alert('please select catogory');
            
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "date":date,
                    "category": this.state.label,
                    "input": this.state.value
                })
            };
            var url = "https://localhost:5001/api/search/" + "204049316"
            console.log("sending get function")
            handleRequest(url, requestOptions) 
            //const response = await fetch(url, requestOptions)
            //const data = await response.json()
            //console.log(data)
        } 
        event.preventDefault();
       
    }

     async handleRequest(url, requestOptions) {
        console.log("in handleRequest")
        const response = await fetch(url, requestOptions);
         if (response.status == 200) {

             const data = await response.json();
             console.log(data)
         }
        //    var dataChnage = data.replace('[', '')
        //    dataChnage = dataChnage.replace(']', '')
        //    dataChnage = dataChnage.replaceAll('"', '')
        //    console.log(dataChnage)
        //    if (dataChnage != "null") {
        //        console.log("naama")
        //        peopleList = dataChnage.split(",")
        //        setPeople(peopleList)
        //    }



        //}
        //else {

        //}

    }
    handleSelect(event) {
        console.log(event)
        this.setState({ label: event });
        console.log(this.state.label)
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
                            onSelect={this.handleSelect}
                            value={this.state.value} 
                        >
                            <Dropdown.Item href="#" eventKey='EmployeeName'>Employee Name</Dropdown.Item>
                            <Dropdown.Item href="#" eventKey='Department'>Department</Dropdown.Item>
                            <Dropdown.Item href="#" eventKey='Floor'>Floor</Dropdown.Item>
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
    const [message, setMessage] = useState();
    const [title, setTitle] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showWaitingList, setShowWaitingList] = useState(false);
    const handleCloseWaitingList = () => setShowWaitingList(false);
    const handleShowWaitingList = () => setShowWaitingList(true);

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
        date = newCalDateFormat
        var url = "https://localhost:5001/api/calendar/" + newCalDateFormat;
        handleRequest(url, requestOptions)
    }

    
    async function AddToWaitingList(calDate) {
        { handleCloseWaitingList() }
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "date": calDate
            })
        };
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
                
                peopleList = dataChnage.split(",")
                setPeople(peopleList)
            }

        }
        else if (response.status == 404) {
            console.log("response.status == 404")
            return (<>
                <Container fluid>
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

                    <Modal show={showWaitingList} onHide={handleCloseWaitingList}>
                        <Modal.Header closeButton>
                            <Modal.Title>No available space</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>There is no available space  on the selected day. Do you want to subscribe to the waiting list?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="Primary" onClick={AddToWaitingList}>Yes</Button>
                            <Button variant="secondary" onClick={handleCloseWaitingList}>No</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </>
            );
        
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