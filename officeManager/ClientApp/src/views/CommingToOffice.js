import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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


    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({ value: value });
        console.log(value)
        
    }

     handleSubmit(event) {
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
            var url = "https://localhost:44375/api/search/" + "204049316"
            console.log("sending get function")
            const response = fetch(url, requestOptions)
            const data =  response.json
            console.log(data)
        } 

         //event.preventDefault();
       
    }

      handleRequest(url, requestOptions) {
        console.log("in handleRequest")
        const response = fetch(url, requestOptions);
         if (response.status == 200) {

             const data = response.json();
             console.log(data)
             event.preventDefault();

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
    const [buttons, setButtons] = useState(true);


    const [message, setMessage] = useState();
    const [title, setTitle] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showWaitingList, setShowWaitingList] = useState(false);
    const handleCloseWaitingList = () => setShowWaitingList(false);
    const handleShowWaitingList = () => setShowWaitingList(true);

    const [showParking, setShowParking] = useState(false);
    const handleCloseParking = () => setShowParking(false);
    const handleShowParking = () => setShowParking(true);
  
    function showSearchBar() {
        let button;
        if (DateIsClick) {
            button = <NameForm></NameForm>;
            
        }
        return button;
    }

    function showAddButton() {
        if (DateIsClick && buttons == true) {
            return (
                <>
                    <Button variant="primary" style={{ margin: '10px' }} onClick={clickSubmit} >Submit</Button>
                    <Button variant="danger" onClick={clickRemove} >Remove</Button>
                </>
            )
        }
    }

    async function onChange(calDate) {
        setCalDate(calDate)    
        var newCalDateFormat = calDate.toLocaleString().split(",")[0]
        setDateIsClick(true)
        var today = new Date();
        if (today > calDate) {
            setButtons(false)

        } else {
            setButtons(true)
        }
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
        var url = "https://localhost:44375/api/calendar/" + newCalDateFormat;
        handleRequest(url, requestOptions)
    }

    async function handleRequest(url, requestOptions) {
        var peopleList = []
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            console.log(data)
            if (data == "no space")
                return data
            var obj = JSON.parse(data)
            var dataChnage = obj["EmployeesArriving"]
            console.log(dataChnage)
            if (dataChnage == null) {
                setPeople(peopleList)
            }

            if (dataChnage != null) {              
                dataChnage = dataChnage.slice(0, -1)
                peopleList = dataChnage.split(",")
                setPeople(peopleList)
            }
          
        }
        else if (response.status == 404) {
            console.log("response.status == 404")
            setPeople([])
        }

        return obj;
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
        var data = await handleRequest("https://localhost:44375/api/calendar", requestOptions)
            console.log(data)
            if (data == "no space") {
                handleShowWaitingList()
            }
            else {
                if (data["ParkingCapacity"] > 0) {
                    handleShowParking()
                }
            }
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
        handleRequest("https://localhost:44375/api/calendar", requestOptions)
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

    async function AddToWaitingList() {
        { handleCloseWaitingList() } 
        var newCalDateFormat = calDate.toLocaleString().split(",")[0]
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "id": "204049316",
                "date": newCalDateFormat
            })
        };
        //newCalDateFormat = newCalDateFormat.replaceAll('/','.')
        var url = "https://localhost:44375/api/calendar/";
        const response = await fetch(url, requestOptions);
        console.log(response)
             if (response.status == 204) {
                setTitle("Info")
                setMessage("Added to Waiting List.")
                { handleShow() }
            }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to add to waiting list.")
            { handleShow() }
        }
    }

    async function AddToParking() {
        { handleCloseParking() }
        var newCalDateFormat = calDate.toLocaleString().split(",")[0]
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        console.log(newCalDateFormat)
        newCalDateFormat = newCalDateFormat.replaceAll('/', '.')
        console.log(newCalDateFormat)
        var url = "https://localhost:44375/api/calendar/" + newCalDateFormat;
        const response = await fetch(url, requestOptions);
        if (response.status == 204) {
            setTitle("Info")
            setMessage("Your car was added.")
            { handleShow() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to add car.")
            { handleShow() }
        }
    }

    
    return (
        <div className="result-calendar" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Calendar onChange={onChange} value={calDate} />
            {showSearchBar()}

            <div style={{ position: 'fixed',left: '260px', top: '450px', width: '300px' }}>
                <Container fluid="md" >
                    {showAddButton()}
                    {showPeopleCame()}
                </Container>
            </div>
            <div>
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
                        <p>There is no available space on the selected day. Do you want to subscribe to the waiting list?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="Primary" onClick={AddToWaitingList}>Yes</Button>
                        <Button variant="secondary" onClick={handleCloseWaitingList}>No</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showParking} onHide={handleCloseParking}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comming with a car?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you plan to come with a care to the office?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="Primary" onClick={AddToParking}>Yes</Button>
                        <Button variant="secondary" onClick={handleCloseParking}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

//export default CommingToOffice;