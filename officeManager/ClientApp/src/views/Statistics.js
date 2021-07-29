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
        dataDepartmentWeek: {
            series: []
        },
        dataFloorsWeek: {
            series: []
        },
        dataRolesWeek: {
            series: []
        },
        dataEmployeesWeek: {
            series: []
        },
        dataDepartmentMonth: {
            series: []
        },
        dataFloorsMonth: {
            series: []
        },
        dataRolesMonth: {
            series: []
        },
        dataEmployeesMonth: {
            series: []
        },
        TotalArrivalsWeek: 0,
        TotalArrivalsMonth: 0
    }

    setTotalWeek = (data) => {
        var obj = JSON.parse(data)
        var total = obj["TotalArrivals"]
        this.state.TotalArrivalsWeek = total
    }

    setTotalMonth = (data) => {
        var obj = JSON.parse(data)
        var total = obj["TotalArrivals"]
        this.state.TotalArrivalsMonth = total
    }

    calculateDepartment = (data) => {
        var obj = JSON.parse(data)
        var series = []
        var total = obj["TotalArrivals"]
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

    calculateFloors = (data,) => {
        var obj = JSON.parse(data)
        var total = obj["TotalArrivals"]
        var series = []
        var floors = Object.keys(obj["Floors"])
        for (var i = 0; i < Object.keys(obj["Floors"]).length; i++) {
            var res = (((obj["Floors"][floors[i]]) / total) * 100).toFixed(2)
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

    calculateRoles = (data) => {
        var obj = JSON.parse(data)
        var total = obj["TotalArrivals"]
        var series = []
        var roles = Object.keys(obj["Roles"])
        for (var i = 0; i < Object.keys(obj["Roles"]).length; i++) {
            var res = (((obj["Roles"][roles[i]]) / total) * 100).toFixed(2)
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

    calculateEmployees = (data) => {
        var obj = JSON.parse(data)
        var seriesVals = []
        var employees = Object.keys(obj["Employees"])


        for (var i = 0; i < Object.keys(obj["Employees"]).length; i++) {
            seriesVals.push((obj["Employees"][employees[i]]))
        }
        var dataReturn = {
            //       labels: this.getEmployeesNames(employees),
            labels: employees,
            series: [seriesVals]
        }
        return dataReturn;
    }

    async getEmployeesNames(ids) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                ids
            )
        };
        var test = []
        const results = await fetch("https://localhost:44375/api/statistics/", requestOptions).then(response => response.json())
            .then(names => {
                test = names
            });
        return test;
    }


    componentDidMount = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const result = fetch("https://localhost:44375/api/Statistics/7", requestOptions).then(response => response.json())
            .then(dataWeek => {
                this.setTotalWeek(dataWeek);
                const department = this.calculateDepartment(dataWeek);
                const floors = this.calculateFloors(dataWeek);
                const roles = this.calculateRoles(dataWeek);
                const employees = this.calculateEmployees(dataWeek);
                this.state.dataDepartmentWeek = department;
                this.state.dataFloorsWeek = floors;
                this.state.dataRolesWeek = roles;
                this.state.dataEmployeesWeek = employees;
            });
        const result1 = fetch("https://localhost:44375/api/Statistics/30", requestOptions).then(response => response.json())
            .then(dataMonth => {
                this.setTotalMonth(dataMonth);
                const departmentMonth = this.calculateDepartment(dataMonth);
                const floorsMonth = this.calculateFloors(dataMonth);
                const rolesMonth = this.calculateRoles(dataMonth);
                const employeesMonth = this.calculateEmployees(dataMonth);
                this.state.dataDepartmentMonth = departmentMonth;
                this.state.dataFloorsMonth = floorsMonth;
                this.state.dataRolesMonth = rolesMonth;
                this.setState({ dataEmployeesMonth: employeesMonth });
            });
    };

    render() {

        let weekBarOptions = {
            high: 7,
            low: 0
        };

        let monthBarOptions = {
            high: 30,
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
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsWeek}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataDepartmentWeek} options={options} type={type} />
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md="6">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 7 days arrival filtered by Floors</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsWeek}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataFloorsWeek} options={options} type={type} />
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
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsWeek}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataRolesWeek} options={options} type={type} />
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
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsWeek}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataEmployeesWeek} options={weekBarOptions} type={barType} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 30 days arrival filtered by Departments</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsMonth}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataDepartmentMonth} options={options} type={type} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md="6">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 30 days arrival filtered by Floors</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsMonth}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataFloorsMonth} options={options} type={type} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 30 days arrival filtered by Roles</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsMonth}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataRolesMonth} options={options} type={type} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Last 30 days arrival filtered by Employees</Card.Title>
                                    <p className="card-category">
                                        TOTAL ARRIVALS AMOUNT: {this.state.TotalArrivalsMonth}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ChartistGraph data={this.state.dataEmployeesMonth} options={monthBarOptions} type={barType} />
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