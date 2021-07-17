import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

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
            <Form.Group>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </Form.Label>
                    <input type="submit" value="Search" />
                </Form>
             </Form.Group>
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
            return <Button variant="primary" onClick={clickSubmit}>Submit</Button>
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
        //var url = "https://localhost:5001/api/calendar/" + newCalDateFormat;
        //console.log(url)
        //setDateIsClick(true)
        //var peopleList = []
        //const response = await fetch(url, requestOptions);
        //if (response.status == 200) {
        //    console.log("in the if")
        //    const data = await response.json();
        //    peopleList = data.split(",")

        //}
        //else {

        //}
        //setPeople(peopleList)
    }


    async function handleRequest(url, requestOptions) {
        var peopleList = []
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            console.log("in the if")
            const data = await response.json();
            peopleList = data.split(",")

        }
        else {

        }
        setPeople(peopleList)
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
        var peopleList = []
        console.log(requestOptions)
        handleRequest("https://localhost:5001/api/calendar", requestOptions)

        //const response = await fetch("https://localhost:5001/api/calendar", requestOptions);
        //if (response.status == 200) {
        //    console.log("in the if")
        //    const data = await response.json();
        //    peopleList = data.split(",")

        //}
        //else {

        //}
        //setPeople(peopleList)
    }

    function showPeopleCame() {
        return (
            < React.Fragment >
                <ListGroup>
                    {people.map(listitem => (
                        <ListGroup.Item>
                            {listitem}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </React.Fragment >
        );
       
    }

    return (
        <div className="result-calendar">
            <Calendar onChange={onChange} value={calDate} />
            {showSearchBar()}
            {showAddButton()}
            {showPeopleCame()}
        </div>
    )

}

//export default CommingToOffice;
