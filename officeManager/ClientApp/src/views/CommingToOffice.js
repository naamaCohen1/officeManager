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
        this.state = { value: '', label: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.isClicked = false;

    }

    handleChange(event) {
         //let label = event.target.label;
        //let label = event.nativeEvent.target[index].text;
        let value = event.target.value;

        this.setState({ value: value });
        //this.setState({ value: event.target.value });
        //this.state.label = event.nativeEvent.target[index].text
        //this.setState({ data: Dropdown });
        console.log(value)
        //console.log(label)
    }

    handleSubmit(event) {
        console.log("ia am here")
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleSelect(event) {
        console.log(event)
        //let label = event.target.value;
        //this.setState({ label: label });
        //console.log(label)
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
             <Button variant="primary" style={{margin: '10px'}}  onClick={clickSubmit} >Submit</Button>
             <Button variant="dark" onClick={clickRemove} >Remove</Button>
            </>
            )
        } 
    }
   
    async function  onChange(calDate) {
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
        <div className="result-calendar" style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Calendar onChange={onChange} value={calDate} />
            {showSearchBar()}

            <div style={{ position: 'absolute', left: '15px', top: '420px',width: '300px'}}>
                <Container fluid="md">
            {showAddButton()}
            {showPeopleCame()}
                </Container>
            </div>
        </div>
    )

}

//export default CommingToOffice;
