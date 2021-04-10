import React from "react";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";

function OfficeEmployees() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="card-plain table-plain-bg">
                            <Card.Header>
                                <Card.Title as="h4">Office Employees</Card.Title>
                                <p className="card-category">
                                    All employees will be presented in this page.
                                    You can edit, add and delete employees.
                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">Role</th>
                                            <th className="border-0">Car Number</th>
                                            <th className="border-0">Floor</th>
                                            <th className="border-0">Room Number</th>
                                            <th className="border-0">Permission Level</th>
                                            <th className="border-0"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>205666415</td>
                                            <td>Chen Tevet</td>
                                            <td>Developer</td>
                                            <td>7753954</td>
                                            <td>11</td>
                                            <td>13</td>
                                            <td>STANDARD</td>
                                            <td>
                                                <Button
                                                    className="btn-fill pull-right"
                                                    type="submit"
                                                    variant="info"
                                                >
                                                    Edit
                  </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Minerva Hooper</td>
                                            <td>$23,789</td>
                                            <td>Curaçao</td>
                                            <td>Sinaai-Waas</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Sage Rodriguez</td>
                                            <td>$56,142</td>
                                            <td>Netherlands</td>
                                            <td>Baileux</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Philip Chaney</td>
                                            <td>$38,735</td>
                                            <td>Korea, South</td>
                                            <td>Overland Park</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Doris Greene</td>
                                            <td>$63,542</td>
                                            <td>Malawi</td>
                                            <td>Feldkirchen in Kärnten</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Mason Porter</td>
                                            <td>$78,615</td>
                                            <td>Chile</td>
                                            <td>Gloucester</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default OfficeEmployees;
