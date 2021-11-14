import * as React from "react"
import { Row, Button } from "react-bootstrap"

const positivePercentChangeStyle = {
  color: "limegreen",
  float: "right",
  pointerEvents: "none"
}

const negativePercentChangeStyle = {
  color: "red",
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
  let yesterdayStockData = stock.day_candles[stock.day_candles.length-2].close;
  let todayStockData = stock.day_candles[stock.day_candles.length-1].close
  const dailyPercentChange = ((todayStockData - yesterdayStockData) / yesterdayStockData * 100).toFixed(2);

  console.log(dailyPercentChange);

  return (
    <Row>
      <Button
        onClick={handleClick}
        style={stockRowStyle}
        variant={"outline-dark"}
        size="md"
        value={stock}
      >
        <b>
        <label style={tickerStyle}>
          ${stock.searchName || stock.ticker}
        </label>

        <label style={dailyPercentChange >= 0 ? positivePercentChangeStyle : negativePercentChangeStyle}>
          {dailyPercentChange >= 0 ? "+" : ""}{dailyPercentChange}%
        </label>
        </b>

      </Button>
    </Row>

  );
}
