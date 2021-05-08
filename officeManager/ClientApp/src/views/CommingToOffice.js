import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    function showSearchBar() {
        //const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (DateIsClick) {
            button = <NameForm></NameForm>;
        } 
        return button;
    }

    function showAddButton() {
        if (DateIsClick) {
            return <Button variant="primary">Submit</Button>
        } 
    }
   
    function onChange(calDate) {
        // change results based on calendar date click
        //NameForm.handleCalendarClick();
        console.log("naama")
        setDateIsClick(true)
        console.log(DateIsClick)
        setCalDate(calDate)
    }

    function showPeopleCame() {

    }

    return (
        <div className="result-calendar">
            <Calendar onChange={onChange} value={calDate} />
            {showSearchBar()}
            {showAddButton()}
        </div>
    )

}

function onChange(calDate) {
    setCalDate(calDate)

    const filteredResults = userResults.filter(result => {
        const newResultFormat = new Date(result.created_at).toLocaleString().split(",")[0]
        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        return newResultFormat === newCalDateFormat
    })
}




//naama




//
//export default CommingToOffice;
