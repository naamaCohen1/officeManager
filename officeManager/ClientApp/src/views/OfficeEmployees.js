import React from "react";

// react-bootstrap components
import {
    Button,
    Card,
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
                    <Col md="14">
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
                                            <th className="border-0"></th>
                                            <th className="border-0">
                                                <Button
                                                    className="btn-fill pull-right"
                                                    type="submit"
                                                    variant="success"
                                                    size='sm'
                                                    style={{ height: '30px', width: '103px' }}
                                                >
                                                    Add Employee
                  </Button>
                                            </th>
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
                                                    size='sm'
                                                    style={{ height: '30px', width: '60px' }}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    className="btn-fill pull-right"
                                                    size='sm'
                                                    type="button"
                                                    variant="danger"
                                                    style={{
                                                        height: '30px', width: '60px' }}
    >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Minerva Hooper</td>
                                            <td>QA</td>
                                            <td></td>
                                            <td>12</td>
                                            <td></td>
                                            <td>STANDARD</td>
                                            <td>
                                                <Button
                                                    className="btn-fill pull-right"
                                                    type="submit"
                                                    variant="info"
                                                    size='sm'
                                                    style={{ height: '30px', width: '60px' }}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    className="btn-fill pull-right"
                                                    size='sm'
                                                    type="button"
                                                    variant="danger"
                                                    style={{
                                                        height: '30px', width: '60px'
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Sage Rodriguez</td>
                                            <td>Manager</td>
                                            <td>12312123</td>
                                            <td>11</td>
                                            <td>1</td>
                                            <td>ANDINISTRATOR</td>
                                            <td>
                                                <Button
                                                    className="btn-fill pull-right"
                                                    type="submit"
                                                    variant="info"
                                                    size='sm'
                                                    style={{ height: '30px', width: '60px' }}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    className="btn-fill pull-right"
                                                    size='sm'
                                                    type="button"
                                                    variant="danger"
                                                    style={{
                                                        height: '30px', width: '60px'
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
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
