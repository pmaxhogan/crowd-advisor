import * as React from "react"
import { Container } from "react-bootstrap"
import StockRow from "./stockrow"

export default function StockTable(props) {
  const { stocks, onClickRow, name } = props;
  return (
    <Container>
      <h1>{name}</h1>
      <hr/>
      {stocks && stocks.map( (stock, index) => {
        return <StockRow onClickRow={onClickRow} index={index} stock={stock} key={stock.ticker} />
      })}
    </Container>

  )
}
