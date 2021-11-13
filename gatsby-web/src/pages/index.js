import * as React from "react";
import NavbarComponent from "../components/navbar";
import firebase from "gatsby-plugin-firebase";
import { Col, Row, Container } from "react-bootstrap"

// markup
class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: []
        };
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

    render () {
        console.log("Rendering stocks", this.state.stocks);

        return (
            <main>
                <title>Home Page</title>
                <NavbarComponent />
                <Container>
                    <Row>
                        <Col md={4}>
                            Stocks
                        </Col>
                        <Col>
                            Charts
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
};

export default IndexPage
