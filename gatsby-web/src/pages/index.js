import * as React from "react";
import NavbarComponent from "../components/navbar";
import firebase from "gatsby-plugin-firebase";
import { Col, Row, Container } from "react-bootstrap";
import StockTable from "../components/stocktable";
import StockChart from "../components/stockchart";

// markup
class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            selectedRow: undefined
        };
        this.onClickRow = this.onClickRow.bind(this);
    }

    async getData(){
        const firestore = firebase.firestore();
        const stocksResults = await firestore.collection("stocks").get();

        const stocks =  stocksResults.docs.map(stockDoc => ({
            ticker: stockDoc.id,
            ...stockDoc.data()
        }));

        return {stocks};
    }

    async componentDidMount() {
        const {stocks} = await this.getData();

        this.setState({stocks});
    }

    onClickRow(row) {
      console.log(row);
      this.setState({selectedRow: row});
    }

    render () {
        console.log("Rendering stocks", this.state.stocks);

        return (
            <main>
                <title>Home Page</title>
                <NavbarComponent />
                <Container>
                    <Row>
                        <Col md={3}>
                            <StockTable onClickRow={this.onClickRow} stocks={this.state.stocks}/>
                        </Col>
                        <Col>
                          {
                            (!this.state.selectedRow)
                              ? <h1>Please select a stock ticker.</h1>
                              : <StockChart stock={this.state.selectedRow} />
                          }
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
};

export default IndexPage
