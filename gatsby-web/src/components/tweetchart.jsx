import React from "react";
import Chart from "react-google-charts";
import { Row, Col, Container, Image } from "react-bootstrap";

export default function TweetChart(props) {

    console.log(props.stock.daySentiment);
    let sentimentData = [
        ['Date', 'Sentiment'],
    ]
    props.stock.daySentiment.forEach( data => {
        sentimentData.push([data.day.toDate().toLocaleDateString(), data.sentiment])
    })

    return (
        <Row style={{marginTop: "50px", marginBottom: "50px"}}>
            <Col>
                <h3 style={{textAlign: "center"}}>Analyzed Tweet Sentiment</h3>
                <Container>
                    <Chart
                        width={'100%'}
                        height={'200px'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={sentimentData}
                        options={{
                        chartArea: { width: '70%' },
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            maxValue: 1,
                            minValue: -1
                        },
                        }}
                    />
                </Container>
            </Col>
        </Row>
    );
}
