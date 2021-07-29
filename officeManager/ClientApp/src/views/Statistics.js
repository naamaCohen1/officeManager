import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import {
    Card,
    Container,
    Row,
    Col
} from "react-bootstrap";

export default class Statistics extends React.Component {
    state = {
        dataDepartment: {
            series: []
        },
        dataFloors: {
            series: []
        },
        dataRoles: {
            series: []
        },
        dataEmployees: {
            series: []
        },
        TotalArrivals: 0
    }

    calculateWeekDepartment = (data) => {
        var obj = JSON.parse(data)
        var series = []
        var total = obj["TotalArrivals"]
        this.state.TotalArrivals = total
        var departments = Object.keys(obj["Departments"])
        for (var i = 0; i < Object.keys(obj["Departments"]).length; i++) {
            var res = (((obj["Departments"][departments[i]]) / total) * 100).toFixed(2)
            var digObj =
            {
                label: departments[i],
                value: res,
                name: departments[i]
            }
            departments[i] += '\n' + res + "%"
            series.push(digObj)
        }
        var dataReturn = {
            labels: departments,
            series
        }
        return dataReturn;
    }

    calculateWeekFloors = (data) => {
        var obj = JSON.parse(data)
        var series = []
        var floors = Object.keys(obj["Floors"])
        for (var i = 0; i < Object.keys(obj["Floors"]).length; i++) {
            var res = (((obj["Floors"][floors[i]]) / this.state.TotalArrivals) * 100).toFixed(2)
            var digObj =
            {
                label: floors[i],
                value: res,
                name: floors[i]
            }
            floors[i] += '\n' + res + "%"
            series.push(digObj)
        }
        var dataReturn = {
            labels: floors,
            series
        }
        return dataReturn;
    }

    calculateWeekRoles = (data) => {
        var obj = JSON.parse(data)
        var series = []
        var roles = Object.keys(obj["Roles"])
        for (var i = 0; i < Object.keys(obj["Roles"]).length; i++) {
            var res = (((obj["Roles"][roles[i]]) / this.state.TotalArrivals) * 100).toFixed(2)
            var digObj =
            {
                label: roles[i],
                value: res,
                name: roles[i]
            }
            roles[i] += '\n' + res + "%"
            series.push(digObj)
        }
        var dataReturn = {
            labels: roles,
            series
        }
        return dataReturn;
    }

    calculateWeekREmployees = (data) => {
        var obj = JSON.parse(data)
        var seriesVals = []
        var employees = Object.keys(obj["Employees"])
        for (var i = 0; i < Object.keys(obj["Employees"]).length; i++) {
            seriesVals.push((obj["Employees"][employees[i]]))
        }
        console.log(seriesVals)
        var dataReturn = {
            labels: employees,
            series: [seriesVals]
        }
        console.log(dataReturn)
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
                const department = this.calculateWeekDepartment(data);
                const floors = this.calculateWeekFloors(data);
                const roles = this.calculateWeekRoles(data);
                const employees = this.calculateWeekREmployees(data);
                this.setState({ dataDepartment: department });
                this.setState({ dataFloors: floors });
                this.setState({ dataRoles: roles });
                this.setState({ dataEmployees: employees });
            });
    };

    render() {

        let weekBarOptions = {
            high: 7,
            low: 0
        };

        let options = {
            donut: false
        };

        let type = "Pie";
        let barType = "Bar";

        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="6">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 7 days arrival filtered by Departments</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivals}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>   
                                        <ChartistGraph data={this.state.dataDepartment} options={options} type={type} />
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md="6">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 7 days arrival filtered by Floors</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivals}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataFloors} options={options} type={type} />
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 7 days arrival filtered by Roles</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivals}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataRoles} options={options} type={type} />
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 7 days arrival filtered by Employees</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivals}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataEmployees} options={weekBarOptions} type={barType} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}