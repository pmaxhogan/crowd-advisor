import * as React from "react"
import { Row, Col, Container } from "react-bootstrap"
import Chart from "./chart"

export default function StockChart(props) {
    const { stock } = props;

    return (
        <Row>
            <Col>
                <h1>{stock.name}</h1>
                <h3>${stock.ticker}</h3>
                <Container>
                    {<Chart data={stock.day_candles} key={Math.random()} />}
                </Container>

            </Col>
            <hr/>
        </Row>

    )
}
