import * as React from "react"
import { Row, Col, Container } from "react-bootstrap"
import Chart from "./chart"

export default function StockChart(props) {
  let { stock } = props;

  let data;
  
  if (stock && stock.day_candles) {
    data = stock.day_candles.map( obj => {
      obj.date = obj.day.toDate();
      return obj;
    });
  }


  return (
    <Row>
      <Col>
        <h1>{stock.name}</h1>
        <h3>${stock.ticker}</h3>
        <Container>
          {data && <Chart data={data} />}
        </Container>

      </Col>
    </Row>
    
  )

}