import * as React from "react";
import NavbarComponent from "../components/navbar";
import firebase from "gatsby-plugin-firebase";
import {Col, Container, Row} from "react-bootstrap";
import StockTable from "../components/stocktable";
import StockChart from "../components/stockchart";
import "../styles/index.css";
import Tweets from "../components/tweets";
import News from "../components/news";

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

    async getData() {
        const firestore = firebase.firestore();
        const stocksResults = await firestore.collection("stocks").get();

        const stocks = stocksResults.docs.map(stockDoc => ({
            ticker: stockDoc.id,
            ...stockDoc.data()
        }));

        return {stocks};
    }

    async componentDidMount() {
        const {stocks} = await this.getData();

        this.setState({stocks});
    }

    onClickRow(stock) {
        console.log(stock);
        this.setState({selectedRow: stock});
    }

    render() {
        console.log("Rendering stocks", this.state.stocks);

        return (
            <main>
                <title>Home Page</title>
                <NavbarComponent/>
                <Container>
                    <Row>
                        <Col md={3}>
                            <StockTable onClickRow={this.onClickRow} stocks={this.state.stocks}/>
                        </Col>
                        <Col>
                            {
                                (!this.state.selectedRow)
                                    ? <h1>Please select a stock ticker.</h1>
                                    : <StockChart stock={this.state.selectedRow}/>
                            }
                            {this.state.selectedRow && <News news={this.state.selectedRow.news}/>}
                            {this.state.selectedRow && <Tweets tweets={this.state.selectedRow.tweets}/>}
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
};

export default IndexPage;
