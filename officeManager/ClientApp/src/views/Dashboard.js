import React, { Component } from "react";
import ChartistGraph from "react-chartist";
//import ChartistTooltip from 'chartist-plugin-tooltips-updated';

//react-bootstrap components
//import {
//    components
//    Badge,
//    Button,
//    Card,
//    Navbar,
//    Nav,
//    Table,
//    Container,
//    Row,
//    Col,
//    Form,
//    OverlayTrigger,
//    Tooltip,
//} from "react-bootstrap";
//import * as Chartist from "chartist";

////function Dashboard() {
////    return (
////        <>
////            <Container fluid>
////                <Row>
////                    <Col lg="3" sm="6">
////                        <Card className="card-stats">
////                            <Card.Body>
////                                <Row>
////                                    <Col xs="5">
////                                        <div className="icon-big text-center icon-warning">
////                                            <i className="nc-icon nc-chart text-warning"></i>
////                                        </div>
////                                    </Col>
////                                    <Col xs="7">
////                                        <div className="numbers">
////                                            <p className="card-category">Number</p>
////                                            <Card.Title as="h4">150GB</Card.Title>
////                                        </div>
////                                    </Col>
////                                </Row>
////                            </Card.Body>
////                            <Card.Footer>
////                                <hr></hr>
////                                <div className="stats">
////                                    <i className="fas fa-redo mr-1"></i>
////                  Update Now
////                </div>
////                            </Card.Footer>
////                        </Card>
////                    </Col>
////                    <Col lg="3" sm="6">
////                        <Card className="card-stats">
////                            <Card.Body>
////                                <Row>
////                                    <Col xs="5">
////                                        <div className="icon-big text-center icon-warning">
////                                            <i className="nc-icon nc-light-3 text-success"></i>
////                                        </div>
////                                    </Col>
////                                    <Col xs="7">
////                                        <div className="numbers">
////                                            <p className="card-category">Revenue</p>
////                                            <Card.Title as="h4">$ 1,345</Card.Title>
////                                        </div>
////                                    </Col>
////                                </Row>
////                            </Card.Body>
////                            <Card.Footer>
////                                <hr></hr>
////                                <div className="stats">
////                                    <i className="far fa-calendar-alt mr-1"></i>
////                  Last day
////                </div>
////                            </Card.Footer>
////                        </Card>
////                    </Col>
////                    <Col lg="3" sm="6">
////                        <Card className="card-stats">
////                            <Card.Body>
////                                <Row>
////                                    <Col xs="5">
////                                        <div className="icon-big text-center icon-warning">
////                                            <i className="nc-icon nc-vector text-danger"></i>
////                                        </div>
////                                    </Col>
////                                    <Col xs="7">
////                                        <div className="numbers">
////                                            <p className="card-category">Errors</p>
////                                            <Card.Title as="h4">23</Card.Title>
////                                        </div>
////                                    </Col>
////                                </Row>
////                            </Card.Body>
////                            <Card.Footer>
////                                <hr></hr>
////                                <div className="stats">
////                                    <i className="far fa-clock-o mr-1"></i>
////                  In the last hour
////                </div>
////                            </Card.Footer>
////                        </Card>
////                    </Col>
////                    <Col lg="3" sm="6">
////                        <Card className="card-stats">
////                            <Card.Body>
////                                <Row>
////                                    <Col xs="5">
////                                        <div className="icon-big text-center icon-warning">
////                                            <i className="nc-icon nc-favourite-28 text-primary"></i>
////                                        </div>
////                                    </Col>
////                                    <Col xs="7">
////                                        <div className="numbers">
////                                            <p className="card-category">Followers</p>
////                                            <Card.Title as="h4">+45K</Card.Title>
////                                        </div>
////                                    </Col>
////                                </Row>
////                            </Card.Body>
////                            <Card.Footer>
////                                <hr></hr>
////                                <div className="stats">
////                                    <i className="fas fa-redo mr-1"></i>
////                  Update now
////                </div>
////                            </Card.Footer>
////                        </Card>
////                    </Col>
////                </Row>
////                <Row>
////                    <Col md="8">
////                        <Card>
////                            <Card.Header>
////                                <Card.Title as="h4">Users Behavior</Card.Title>
////                                <p className="card-category">24 Hours performance</p>
////                            </Card.Header>
////                            <Card.Body>
////                                <div className="ct-chart" id="chartHours">
////                                    <ChartistGraph
////                                        data={{
////                                            labels: [
////                                                "9:00AM",
////                                                "12:00AM",
////                                                "3:00PM",
////                                                "6:00PM",
////                                                "9:00PM",
////                                                "12:00PM",
////                                                "3:00AM",
////                                                "6:00AM",
////                                            ],
////                                            series: [
////                                                [287, 385, 490, 492, 554, 586, 698, 695],
////                                                [67, 152, 143, 240, 287, 335, 435, 437],
////                                                [23, 113, 67, 108, 190, 239, 307, 308],
////                                            ],
////                                        }}
////                                        type="Line"
////                                        options={{
////                                            low: 0,
////                                            high: 800,
////                                            showArea: false,
////                                            height: "245px",
////                                            axisX: {
////                                                showGrid: false,
////                                            },
////                                            lineSmooth: true,
////                                            showLine: true,
////                                            showPoint: true,
////                                            fullWidth: true,
////                                            chartPadding: {
////                                                right: 50,
////                                            },
////                                        }}
////                                        responsiveOptions={[
////                                            [
////                                                "screen and (max-width: 640px)",
////                                                {
////                                                    axisX: {
////                                                        labelInterpolationFnc: function (value) {
////                                                            return value[0];
////                                                        },
////                                                    },
////                                                },
////                                            ],
////                                        ]}
////                                    />
////                                </div>
////                            </Card.Body>
////                            <Card.Footer>
////                                <div className="legend">
////                                    <i className="fas fa-circle text-info"></i>
////                  Open <i className="fas fa-circle text-danger"></i>
////                  Click <i className="fas fa-circle text-warning"></i>
////                  Click Second Time
////                </div>
////                                <hr></hr>
////                                <div className="stats">
////                                    <i className="fas fa-history"></i>
////                  Updated 3 minutes ago
////                </div>
////                            </Card.Footer>
////                        </Card>
////                    </Col>
////                    <Col md="4">
////                        <Card>
////                            <Card.Header>
////                                <Card.Title as="h4">7 Days Arrival by Department</Card.Title>
////                                <p className="card-category">Last 7 days employees arrival filtered by Departments</p>
////                            </Card.Header>
////                            <Card.Body>
////                                <div
////                                    className="ct-chart ct-perfect-fourth"
////                                    id="chartPreferences"
////                                >
////                                    <ChartistGraph
////                                        data={{
////                                            labels: ["40%", "20%", "40%"],
////                                            series: [40, 20, 40],
////                                        }}
////                                        type="Pie"
////                                    />
////                                </div>
////                                <div className="legend">
////                                    <i className="fas fa-circle text-info"></i>
////                  Open <i className="fas fa-circle text-danger"></i>
////                  Bounce <i className="fas fa-circle text-warning"></i>
////                  Unsubscribe
////                </div>
////                                <hr></hr>
////                            </Card.Body>
////                        </Card>
////                    </Col>
////                </Row>
////                <Row>
////                    <Col md="6">
////                        <Card>
////                            <Card.Header>
////                                <Card.Title as="h4">2017 Sales</Card.Title>
////                                <p className="card-category">All products including Taxes</p>
////                            </Card.Header>
////                            <Card.Body>
////                                <div className="ct-chart" id="chartActivity">
////                                    <ChartistGraph
////                                        data={{
////                                            labels: [
////                                                "Jan",
////                                                "Feb",
////                                                "Mar",
////                                                "Apr",
////                                                "Mai",
////                                                "Jun",
////                                                "Jul",
////                                                "Aug",
////                                                "Sep",
////                                                "Oct",
////                                                "Nov",
////                                                "Dec",
////                                            ],
////                                            series: [
////                                                [
////                                                    542,
////                                                    443,
////                                                    320,
////                                                    780,
////                                                    553,
////                                                    453,
////                                                    326,
////                                                    434,
////                                                    568,
////                                                    610,
////                                                    756,
////                                                    895,
////                                                ],
////                                                [
////                                                    412,
////                                                    243,
////                                                    280,
////                                                    580,
////                                                    453,
////                                                    353,
////                                                    300,
////                                                    364,
////                                                    368,
////                                                    410,
////                                                    636,
////                                                    695,
////                                                ],
////                                            ],
////                                        }}
////                                        type="Bar"
////                                        options={{
////                                            seriesBarDistance: 10,
////                                            axisX: {
////                                                showGrid: false,
////                                            },
////                                            height: "245px",
////                                        }}
////                                        responsiveOptions={[
////                                            [
////                                                "screen and (max-width: 640px)",
////                                                {
////                                                    seriesBarDistance: 5,
////                                                    axisX: {
////                                                        labelInterpolationFnc: function (value) {
////                                                            return value[0];
////                                                        },
////                                                    },
////                                                },
////                                            ],
////                                        ]}
////                                    />
////                                </div>
////                            </Card.Body>
////                            <Card.Footer>
////                                <div className="legend">
////                                    <i className="fas fa-circle text-info"></i>
////                  Tesla Model S <i className="fas fa-circle text-danger"></i>
////                  BMW 5 Series
////                </div>
////                                <hr></hr>
////                                <div className="stats">
////                                    <i className="fas fa-check"></i>
////                  Data information certified
////                </div>
////                            </Card.Footer>
////                        </Card>
////                    </Col>
////                </Row>
////            </Container>
////        </>
////    );
////}

////export default Dashboard;


export default class Dashboard extends React.Component {
    state = {
        data: {
            series: []
        }
    }

    calculate = (data) => {
        console.log(data)
        var obj = JSON.parse(data)
        var series = []
        var total = obj["TotalArrivals"] 
        var departments = Object.keys(obj["Departments"])
        for (var i = 0; i < Object.keys(obj["Departments"]).length; i++) {
            var res = (((obj["Departments"][departments[i]]) / total) * 100)
            var digObj =
            {
                label: departments[i],
                value: res,
                name: departments[i]
            }
            departments[i] += " " + res +" %"
            series.push(digObj)
        }
        var dataReturn = {
            labels: departments,

            series
         }
        return dataReturn;
    }

    componentDidMount = () => {
        console.log('naama')
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
         const result = fetch("https://localhost:44375/api/Statistics", requestOptions).then(response => response.json())
             .then(data => {
                 const res = this.calculate(data);
                 this.setState({data:res});
             });
    };

    render() {
        
        let options = {
            width: "400px",
            height: "400px",
            donut: false
            
            //showLabel: false,
            //plugins: [
            //    Chartist.plugins()
            //]
        };

        let type = "Pie";

        return (
            <div>
                <ChartistGraph data={this.state.data} options={options} type={type} />
            </div>
        )
    };
}
