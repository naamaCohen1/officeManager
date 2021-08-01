import React, { useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Popup from 'react-popup';
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
        this.state = { value: '', label: 'Search By', people: [], id: sessionStorage.getItem("id") };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        console.log(event.which)
        //if (this.state.label == 'Floor' && event.keyCode != 8) {
        //    let isnum = /^\d+$/.test(value);
        //    console.log(isnum)
        //    if (isnum === false) {
        //        alert('in Floor label you need to enter only numbers');
        //        value = '';
        //    }  
        //}
         this.setState({ value: value });   
    }

    handleSubmit(event) {
        console.log(user_id)
        if (this.state.label == 'Search By') {
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
            if (this.state.label == 'Floor') {
                let isnum = /^\d+$/.test(this.state.value);
                console.log(isnum)
                if (isnum === false) {
                    alert('in Floor label you need to enter only numbers');
                    this.setState({value:''})
                }
            }
            var url = "https://localhost:44375/api/search/" + this.state.id 
            console.log("sending get function")
            fetch(url, requestOptions).then(response => {
                if (response.status == 200) {
                    var data = response.json().then(data => {
                        this.setState({ people: data });
                        console.log(data)
                    })
                }
            })
        } 
          event.preventDefault();
    }

      handleRequest(url, requestOptions) {
        console.log("in handleRequest")
        const response = fetch(url, requestOptions);
         if (response.status == 200) {
             const data = response.json();
             console.log(data)
             event.preventDefault();
         }
    }

    handleSelect(event) {
        console.log(event)
        this.setState({ label: event });
        console.log(this.state.label)
    }

    showSearchPeople() {
        console.log(this.state.people)
        if (this.state.people != null) {
            return (
                < React.Fragment >
                    <ListGroup>
                        {this.state.people.map(listitem => (
                            <ListGroup.Item sm='4'>
                                {listitem}
                            </ListGroup.Item >
                        ))}
                    </ListGroup>
                </React.Fragment >
            );
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} className="mb-3">

                    <InputGroup >
                        <DropdownButton
                            variant="outline-secondary"
                            title={this.state.label}
                            id="input-group-dropdown-1"
                            onSelect={this.handleSelect}
                            value={this.state.value} 
                        >
                            <Dropdown.Item href="#" eventKey='EmployeeName'>Employee Name</Dropdown.Item>
                            <Dropdown.Item href="#" eventKey='Department'>Department</Dropdown.Item>
                            <Dropdown.Item href="#" eventKey='Floor'>Floor</Dropdown.Item>
                        </DropdownButton>
                        <FormControl aria-label="Text input with dropdown button" value={this.state.value} onChange={this.handleChange} />
                        <div style={{ position: 'fixed', left: '700px', top: '175px', width: '300px' }}>
                            {this.showSearchPeople()}
                            </div>
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
    const [id, setId] = React.useState(sessionStorage.getItem("id"));

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

    const [dates, setDates] = useState([]);
    const [showDates, setShowDates] = useState(false);
    const handleCloseDates = () => setShowDates(false);
    const handleShowDates = () => setShowDates(true);


    async function showCommingDates() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const response = await fetch("https://localhost:44375/api/calendar/" + id, requestOptions)
        if (response.status == 200) {
            var datesArr = await response.json()
            setDates(datesArr)
            { handleShowDates() }
        }
        else {
            setTitle("Error")
            setMessage("Unexpected error! Fail to get coming to the office dates.")
            { handleShow() }
        }
    }

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
                "id": id
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
                "id": id
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

    function showUpcomingDates() {
        if (dates.length > 0) {
            var testDates = JSON.parse(dates)
            console.log(testDates)
            return (
                < React.Fragment >
                    <ListGroup>
                        {testDates.map(listitem => (
                            <ListGroup.Item sm='4'>
                                {listitem}
                            </ListGroup.Item >
                        ))}
                    </ListGroup>
                </React.Fragment >
            );
        }
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
                "id": id,
                "date": newCalDateFormat
            })
        };
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

    useEffect(() => {
        showCommingDates();
    }, []);

    return (
        <div className="result-calendar" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Calendar onChange={onChange} value={calDate} />
            {showSearchBar()}
            <div style={{ position: 'fixed', left: '260px', top: '450px', width: '300px' }}>
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
                <Modal show={showDates} onHide={handleCloseDates}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Office Dates</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>These are your scheduled days:</p>

                        {showUpcomingDates()}
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-primary" onClick={handleCloseDates}> OK </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}