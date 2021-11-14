import React from "react";
import Chart from "react-google-charts";
import { Row, Col, Container } from "react-bootstrap";

export default function TweetChart(props) {
    
    console.log(props.stock.daySentiment);
    let sentimentData = [
        ['Date', 'Sentiment'],
    ]
    props.stock.daySentiment.forEach( data => {
        sentimentData.push([data.day.toDate().toLocaleDateString(), data.sentiment])
    })

    return (
        <Row>
            <Col>
                <h3 style={{textAlign: "center"}}>Analyzed Tweet Sentiment</h3>
                <Container>
                    <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={sentimentData}
                        options={{
                        // title: 'Population of Largest U.S. Cities',
                        chartArea: { width: '70%' },
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            title: 'Tweet Sentiment',
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