import * as React from "react"
import {Button} from "react-bootstrap";

export default function SearchResults(props) {
    const { results, pickStock, goBack } = props;

    return (
        <>
        <Button onClick={goBack} variant="outline-primary" size="sm" style={{display: "block", marginBottom: "10px"}}>Back</Button>
        {results.filter(result => !result.symbol.includes(".") && !result.symbol.includes("/")).map(result =>
                <Button
                    key={result.symbol}
                    onClick={() => pickStock(result.symbol)}
                    variant={"outline-dark"}
                    size="lg"
                    style={{marginRight: "10px"}}
                >
                    ${result.symbol} - {result.name}
                </Button>
            )}
        </>
    )
}
