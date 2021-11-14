import * as React from "react"
import { Row, Button } from "react-bootstrap"
import "../styles/stockrow.css"

const percentChangeStyle = {
  color: "limegreen",
  float: "right",
  pointerEvents: "none"
}

const tickerStyle = {
  float: "left",
  pointerEvents: "none"
}

const stockRowStyle = {
  marginBottom: "5px",
  border: "2px solid black"
}

export default function StockRow(props) {
  const { stock, onClickRow } = props;

  function handleClick(e) {
    if (onClickRow) {
      onClickRow(stock);
    }
  }

  return (
    <Row>
      <Button 
        onClick={handleClick}
        style={stockRowStyle} 
        variant={"outline-dark"} 
        size="lg"
        value={stock}
      >
        <label style={tickerStyle}>
          $<b>{stock.ticker}</b>
        </label>

        <label style={percentChangeStyle}>+5%</label>
        
      </Button>
    </Row>

  );
}