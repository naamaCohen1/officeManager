import React from "react";

// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";

//             Office Availability Certification

function HealthCheck() {
    const [checked, setChecked] = React.useState(false);
    const [id, setId] = React.useState(sessionStorage.getItem("id"));

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Office Availability Certification</Card.Title>
                                <p className="card-category">
                                    Your ID will be recorded when you submit this form.
                                </p>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col className="pl-1" md="10">
                                            <label>
                                                <p>I am not currently showing any signs of COVID-19 including coughing? *</p>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={checked}
                                                    value={checked}
                                                    onChange={(e) => setChecked(e.target.value)} />
                                                I certify this statement is true.
                                                </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="10">
                                            <label>
                                                <p>In the past week, I have not had and currently do not have a body temperature above 38° C/100.4° F? *</p>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={checked}
                                                    value={checked}
                                                    onChange={(e) => setChecked(e.target.value)} />
                                                I certify this statement is true.
                                                </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="10">
                                            <label>
                                                <p>I have not been in close contact with someone who has tested positive for COVID-19
                                                    in the past 14 days? *</p>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={checked}
                                                    value={checked}
                                                    onChange={(e) => setChecked(e.target.value)} />
                                                I certify this statement is true.
                                                </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="10">
                                            <label>
                                                <p>I have read and understand the requirements for office use outlined by the
                                                    CRT and have read and understand any additional building and government requirements. *</p>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={checked}
                                                    value={checked}
                                                    onChange={(e) => setChecked(e.target.value)} />
                                                I certify this statement is true.
                                                </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="10">
                                            <label>
                                                <p>I understand that any office use is strictly voluntary and not a requirement. *</p>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={checked}
                                                    value={checked}
                                                    onChange={(e) => setChecked(e.target.value)} />
                                                I certify this statement is true.
                                                </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="10">
                                            <label>
                                                <p>I confirm that the information I have entered is correct and voluntarily provided.
                                                I also understand that I must notify the company and discontinue office use if any of
                                                my responses change during my scheduled time. If so, I may not use office space again
                                                    until I am able to certify the above statements are true. *</p>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={checked}
                                                    value={checked}
                                                    onChange={(e) => setChecked(e.target.value)} />
                                                I certify this statement is true.
                                                </label>
                                        </Col>
                                    </Row>

                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Submit
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HealthCheck;
