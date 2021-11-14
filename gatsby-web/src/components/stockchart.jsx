import * as React from "react"
import { Row, Col } from "react-bootstrap"

export default function StockChart(props) {
  
  return (
    <Row>
      <Col>
        <h1>{props.stock.name}</h1>
        <h3>${props.stock.ticker}</h3>
        <hr/>
      </Col>
    </Row>
    
  )

}