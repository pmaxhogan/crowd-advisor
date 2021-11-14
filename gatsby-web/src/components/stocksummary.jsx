import * as React from "react"
import {Row, Col, Container, Button} from "react-bootstrap";
import Chart from "./chart"


export default function StockSummary(props) {
    const { stock } = props;

    return (<>
            <h1 style={{textAlign: 'center'}}>${stock.searchName || stock.ticker} - {stock.displayName || stock.name}</h1>
            <div style={{textAlign: 'center'}}>Quick links: {stock.searchName ? undefined :
                <><Button target='_blank' href={`https://www.marketwatch.com/investing/stock/${stock.ticker}`}>MarketWatch</Button>  <Button target='_blank' href={`https://www.cnbc.com/quotes/${stock.ticker}`}>CNBC Quote</Button> <Button target='_blank' href={`https://finance.yahoo.com/quote/${stock.ticker}`}>Yahoo Finance</Button> <Button target='_blank' href={`https://www.google.com/finance/quote/${stock.ticker}`}>Google Finance</Button> </>
            }<Button target='_blank' href={`https://twitter.com/search?q=$${stock.searchName || stock.ticker}`}>Twitter Search</Button> <Button target='_blank' href={`https://www.reddit.com/r/wallstreetbets/search/?q=${stock.searchName || stock.ticker}&restrict_sr=1&sr_nsfw=`}>r/WSB Search</Button></div>
        </>
    )
}
