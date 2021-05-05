import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Results() {
    // set states of calendar date
    const [calDate, setCalDate] = useState(new Date())

    function onChange(calDate) {
        // change results based on calendar date click
        //this.NameForm.render();
        console.log("naama")
        setCalDate(calDate)
    }

    return (
        <div className="result-calendar">
            <Calendar onChange={onChange} value={calDate} />
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


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// react-bootstrap components
//import { Badge, Button, Navbar, Nav, Container } from "react-bootstrap";

//function CommingToOffice() {
//  const mapRef = React.useRef(null);
//  React.useEffect(() => {
//    let google = window.google;
//    let map = mapRef.current;
//    let lat = "40.748817";
//    let lng = "-73.985428";
//    const myLatlng = new google.maps.LatLng(lat, lng);
//    const mapOptions = {
//      zoom: 13,
//      center: myLatlng,
//      scrollwheel: false,
//      zoomControl: true,
//    };

//    map = new google.maps.Map(map, mapOptions);

//    const marker = new google.maps.Marker({
//      position: myLatlng,
//      map: map,
//      animation: google.maps.Animation.DROP,
//      title: "Light Bootstrap Dashboard PRO React!",
//    });

//    const contentString =
//      '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
//      "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";

//    const infowindow = new google.maps.InfoWindow({
//      content: contentString,
//    });

//    google.maps.event.addListener(marker, "click", function () {
//      infowindow.open(map, marker);
//    });
//  }, []);
//  return (
//    <>
//      <div className="map-container">
//        <div id="map" ref={mapRef}></div>
//      </div>
//    </>
//  );
//}

//export default CommingToOffice;


////import React, { useState } from "react";
////import Calendar from "react-calendar";
////import "react-calendar/dist/Calendar.css";
////import moment from "moment";

//function CommingToOffice() {
    //const [dateState, setDateState] = useState(new Date())
    //const changeDate = (e) => {
    //    setDateState(e)
    //}
    //return (
    //    <>
    //        <Calendar
    //            value={dateState}
    //            onChange={changeDate}
    //        />
    //        <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
    //    </>
    //)
//}

//export default CommingToOffice;
