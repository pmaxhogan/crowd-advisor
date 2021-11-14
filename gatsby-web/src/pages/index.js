import * as React from "react";
import NavbarComponent from "../components/navbar";
import firebase from "gatsby-plugin-firebase";
import {Col, Container, Nav, Row, Tab, Tabs} from "react-bootstrap";
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

        let stocks = stocksResults.docs.map(stockDoc => ({
            ticker: stockDoc.id,
            ...stockDoc.data()
        }));

        stocks.forEach(stock => {
            stock.day_candles.map( obj => {
              obj.date = obj.day.toDate();
              return obj;
            });
        });

        return {stocks};
    }

    async componentDidMount() {
        const {stocks} = await this.getData();

        this.setState({stocks});
    }

    onClickRow(stock) {
        this.setState({selectedRow: stock});
    }

    render() {

        return (
            <main>
                <title>Home Page</title>
                <NavbarComponent/>
                <Container>
                    <Row>
                        <Col md={2}>
                            <StockTable onClickRow={this.onClickRow} stocks={this.state.stocks}/>
                        </Col>
                        <Col>
                            {
                            (!this.state.selectedRow)
                                ? <h1>Please select a stock ticker.</h1>
                                : <>
                                <StockChart stock={this.state.selectedRow}/>

                            <Tabs fill variant="tabs" defaultActiveKey="tweets">
                                <Tab eventKey="tweets" title="Tweets">
                                    {this.state.selectedRow && <Tweets tweets={this.state.selectedRow.tweets}/>}
                                </Tab>
                                <Tab eventKey="news" title="News">
                                    {this.state.selectedRow && <News news={this.state.selectedRow.news}/>}
                                </Tab>
                            </Tabs>
                                </>
                            }

                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
};

export default IndexPage;
