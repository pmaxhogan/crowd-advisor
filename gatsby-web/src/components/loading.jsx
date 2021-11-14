import * as React from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";

const divStyle = {
    position: "absolute",
    // top: 0,
    left: 0,
    zIndex: 2,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "white"
};

export default function Loading() {
    return (
        <Container style={divStyle}>
            <Row className="justify-content-md-center">
                <Col>
                    <h3>Crunching stock data...</h3>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            </Row>
        </Container>
    );
}
