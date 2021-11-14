import * as React from "react"
import {Row, Col, Card, Button} from "react-bootstrap";
import { Tweet } from 'react-twitter-widgets'


export default function News(props) {

  return (
    <Row>
      <Col>
          <h3>News</h3>
          <Row>
          {props.news && props.news.map(newsArticle => newsArticle &&
              <Col>
              <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={newsArticle.image} />
                  <Card.Body>
                      <Card.Title>{newsArticle.headline}</Card.Title>
                      <Card.Text>
                          {newsArticle.summary}
                      </Card.Text>
                      <a href={newsArticle.url}><Button variant="primary">From {newsArticle.source}</Button></a>
                  </Card.Body>
              </Card>
              </Col>
          )}
          </Row>
      </Col>
    </Row>

  )

}
