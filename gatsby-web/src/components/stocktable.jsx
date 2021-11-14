import * as React from "react"
import { Container } from "react-bootstrap"
import StockRow from "./stockrow"

export default function StockTable(props) {
  const { stocks } = props;
  return (
    <Container>
      <h1>Stocks</h1>
      <hr/>
      {stocks && stocks.map( (stock, index) => {
        return <StockRow onClickRow={props.onClickRow} index={index} stock={stock} key={stock.ticker} />
      })}
    </Container>

  )
}