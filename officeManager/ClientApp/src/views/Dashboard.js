import React, { useEffect, useState } from "react";
// react-bootstrap components
import {
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
    Modal,
    Form
} from "react-bootstrap";
import ChartistGraph from "react-chartist";


export default function Dashboard() {
  //  var departmentsLabels = "["
  //  var departmentsSeries = "["
    var departmentsLabels = []
    //var departmentsSeries = []
    const [departmentsSeries, setDepartmentsSeries] = useState([])


    const [totalArrivals, setTotalArrivals] = useState([])
    const [employeesKey, setEmployeesKey] = useState([])
    const [employeesVal, setEmployeesVal] = useState([])
    const [departmentsKey, setDepartmentsKey] = useState([])
    const [departmentsVal, setDepartmentsVal] = useState([])
    const [floorsKey, setFloorsKey] = useState([])
    const [floorsVal, setFloorsVal] = useState([])
    const [rolesKey, setRolesKey] = useState([])
    const [rolesVal, setRolesVal] = useState([])

    async function getStatistics() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        var url = "https://localhost:44375/api/statistics";
        const response = await fetch(url, requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            if (data != "null") {
                { getTotalArrivals(data) }
                { getEmployees(data)}
                { getDepartments(data)}
                { getFloors(data)}
                { getRoles(data)}
            }
        }
    }

    async function getTotalArrivals(data) {
        var subString = data.substring(
            data.lastIndexOf("\"TotalArrivals\":") + 16,
            data.lastIndexOf("}")
        );
        totalArrivals.push(subString.trim())
        console.log("totalArrivals " + totalArrivals)
    }

    async function getEmployees(data) {
        var subString = data.substring(
            data.lastIndexOf("\"Employees\":{") + 13,
            data.lastIndexOf("},\"Departments\"")
        );
        var tempEmployees = subString.split(",")

        for (var index in tempEmployees) {
            var employee = (tempEmployees[index]).split(":")
            var id = employee[0]
            id = id.replace("\"", "")
            id = id.replace("\"", "")

            employeesKey.push(id.trim())
            employeesVal.push(employee[1].trim())
        }
        console.log("employeesKey " + employeesKey)
        console.log("employeesVal " + employeesVal)
    }

    async function getDepartments(data) {
        var subString = data.substring(
            data.lastIndexOf("\"Departments\":{") + 15,
            data.lastIndexOf("},\"Floors\"")
        );
        var tempDepartments = subString.split(",")

        for (var index in tempDepartments) {
            var department = (tempDepartments[index]).split(":")
            var dep = department[0]
            dep = dep.replace("\"", "")
            dep = dep.replace("\"", "")

            departmentsKey.push(dep.trim())
            departmentsVal.push(department[1].trim())
        }

        { departmentWeekly() }
        console.log("departmentsKey " + departmentsKey)
        console.log("departmentsVal " + departmentsVal)
    }

    async function getFloors(data) {
        var subString = data.substring(
            data.lastIndexOf("\"Floors\":{") + 10,
            data.lastIndexOf("},\"Roles\"")
        );
        var tempFloors = subString.split(",")

        for (var index in tempFloors) {
            var floor = (tempFloors[index]).split(":")
            var fl = floor[0]
            fl = fl.replace("\"", "")
            fl = fl.replace("\"", "")

            floorsKey.push(fl.trim())
            floorsVal.push(floor[1].trim())
        }
        console.log("floorsKey " + floorsKey)
        console.log("floorsVal " + floorsVal)
    }

    async function getRoles(data) {
        var subString = data.substring(
            data.lastIndexOf("\"Roles\":{") + 9,
            data.lastIndexOf("},\"TotalArrivals\"")
        );
        var tempRoles = subString.split(",")

        for (var index in tempRoles) {
            var role = (tempRoles[index]).split(":")
            var r = role[0]
            r = r.replace("\"", "")
            r = r.replace("\"", "")

            rolesKey.push(r.trim())
            rolesVal.push(role[1].trim())
        }
        console.log("rolesKey " + rolesKey)
        console.log("rolesVal " + rolesVal)
    }

    async function departmentWeekly() {
        for (var val in departmentsVal) {
            departmentsLabels.push(departmentsVal[val] + "%")
            departmentsSeries.push(parseInt(departmentsVal[val]))
        }
    }

    useEffect(() => {
        getStatistics();
    }, []);


return (
    <>
                <Container fluid>
            <Row>
                <Col md="4">
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">7 Days Arrival by Department</Card.Title>
                            <p className="card-category">Last 7 days employees arrival filtered by Departments</p>
                        </Card.Header>
                        <Card.Body>
                            <div
                                className="ct-chart ct-perfect-fourth"
                                id="chartPreferences"
                            >
                                <ChartistGraph
                                     data={{
                                    labels: ["40%", "20%", "40%"],
                                    series: [40, 20, 40],
                                        //labels: [departmentsLabels],
                                        //series: [departmentsSeries],
                                    }}
                                    type="Pie"
                                />
                            </div>
                            <div className="legend">
                                <i className="fas fa-circle text-info"></i> Open
                                <i className="fas fa-circle text-danger"></i> Bounce
                                <i className="fas fa-circle text-warning"></i> Unsubscribe
                </div>
                            <hr></hr>
                      </Card.Body>
                  </Card>
              </Col>
            </Row>
        </Container>
        </>
    );
}

//return (
//        <>
//        <Container fluid>
//            <Row>
//                <Col md="4">
//                    <Card>
//                        <Card.Header>
//                            <Card.Title as="h4">7 Days Arrival by Department</Card.Title>
//                            <p className="card-category">Last 7 days employees arrival filtered by Departments</p>
//                        </Card.Header>
//                        <Card.Body>
//                            <div
//                                className="ct-chart ct-perfect-fourth"
//                                id="chartPreferences"
//                            >
//                                <ChartistGraph
//                                    // data={{
//                                    //labels: ["40%", "20%", "40%"],
//                                    //series: [40, 20, 40],
//                                    // labels: departmentsLabels,
//                                    //series: departmentsSeries,
//                                    //}}
//                                    type="Pie"
//                                />
//                            </div>
//                            <div className="legend">
//                                <i className="fas fa-circle text-info"></i>
//                  Open <i className="fas fa-circle text-danger"></i>
//                  Bounce <i className="fas fa-circle text-warning"></i>
//                  Unsubscribe
//                </div>
//                            <hr></hr>
//                        </Card.Body>
//                    </Card>
//                </Col>
//            </Row>
//            <Row>
//                <Col md="6">
//                    <Card>
//                        <Card.Header>
//                            <Card.Title as="h4">2017 Sales</Card.Title>
//                            <p className="card-category">All products including Taxes</p>
//                        </Card.Header>
//                        <Card.Body>
//                            <div className="ct-chart" id="chartActivity">
//                                <ChartistGraph
//                                    data={{
//                                        labels: [
//                                            "Jan",
//                                            "Feb",
//                                            "Mar",
//                                            "Apr",
//                                            "Mai",
//                                            "Jun",
//                                            "Jul",
//                                            "Aug",
//                                            "Sep",
//                                            "Oct",
//                                            "Nov",
//                                            "Dec",
//                                        ],
//                                        series: [
//                                            [
//                                                542,
//                                                443,
//                                                320,
//                                                780,
//                                                553,
//                                                453,
//                                                326,
//                                                434,
//                                                568,
//                                                610,
//                                                756,
//                                                895,
//                                            ],
//                                            [
//                                                412,
//                                                243,
//                                                280,
//                                                580,
//                                                453,
//                                                353,
//                                                300,
//                                                364,
//                                                368,
//                                                410,
//                                                636,
//                                                695,
//                                            ],
//                                        ],
//                                    }}
//                                    type="Bar"
//                                    options={{
//                                        seriesBarDistance: 10,
//                                        axisX: {
//                                            showGrid: false,
//                                        },
//                                        height: "245px",
//                                    }}
//                                    responsiveOptions={[
//                                        [
//                                            "screen and (max-width: 640px)",
//                                            {
//                                                seriesBarDistance: 5,
//                                                axisX: {
//                                                    labelInterpolationFnc: function (value) {
//                                                        return value[0];
//                                                    },
//                                                },
//                                            },
//                                        ],
//                                    ]}
//                                />
//                            </div>
//                        </Card.Body>
//                        <Card.Footer>
//                            <div className="legend">
//                                <i className="fas fa-circle text-info"></i>
//                  Tesla Model S <i className="fas fa-circle text-danger"></i>
//                  BMW 5 Series
//                </div>
//                            <hr></hr>
//                            <div className="stats">
//                                <i className="fas fa-check"></i>
//                  Data information certified
//                </div>
//                        </Card.Footer>
//                    </Card>
//                </Col>
//            </Row>
//        </Container>











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


//export default class Dashboard extends Component {

//    render() {
//        let data = {
//            series: [
//                {
//                    label: "Series 1",
//                    value: 20,
//                    name: "Series 1"
//                },
//                {
//                    value: 10,
//                    name: "Series 2"
//                },
//                {
//                    value: 70,
//                    name: "Series 3"
//                }
//            ]
//        };

//        let options = {
//            width: "400px",
//            height: "400px",
//            donut: false
//        };

//        let type = "Pie";

//        return (
//            <div>
//                <ChartistGraph data={data} options={options} type={type} />
//            </div>
//        );
//    }
//}

//export default function Result() {


//    function getStatistic() {
//        let button;
//        if (DateIsClick) {
//            button = <NameForm></NameForm>;
//        }
//        return button;
//    }
//}