import * as React from "react"
import { Row, Col, Container } from "react-bootstrap"
import Chart from "./chart"

const noScroll = {
  margin: 0,
  height: "100%",
  overflowY: "hidden"
}

export default function StockChart(props) {
    const { stock } = props;

    return (
        <Row>
            <Col>
                <h1>${stock.ticker} - {stock.name}</h1>
                <Container style={noScroll}>
                    {<Chart data={stock.day_candles} key={Math.random()} />}
                </Container>

            </Col>
            <hr/>
        </Row>

    )
}
