import * as React from "react"
import {Row, Col, Card, Button} from "react-bootstrap";
import "../styles/masonry.css"
import Masonry from 'react-masonry-css'


export default function News(props) {

  return (
    <Row>
      <Col>
          <Masonry
              breakpointCols={3}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {props.news && props.news.map(newsArticle => newsArticle &&
                  <Card key={newsArticle.id} style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={newsArticle.image} />
                      <Card.Body>
                          <Card.Title>{newsArticle.headline}</Card.Title>
                          <Card.Text>
                              {newsArticle.summary}
                          </Card.Text>
                          <a href={newsArticle.url}><Button variant="primary">From {newsArticle.source}</Button></a>
                      </Card.Body>
                  </Card>
                  )}
              </Masonry>
      </Col>
      <hr/>
    </Row>

  )

}
