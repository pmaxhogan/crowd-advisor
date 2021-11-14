import * as React from "react"
import { Row, Col } from "react-bootstrap"
import { Tweet } from 'react-twitter-widgets'


export default function Tweets(props) {

  return (
    <Row>
      <Col>
          <h3>Tweets</h3>
          <Row>
          {props.tweets && props.tweets.map(tweet => tweet.mostPopularTweet &&
              <Col md={6}>
              <Tweet tweetId={tweet.mostPopularTweet}/>
              </Col>
          )}
          </Row>
      </Col>
    </Row>

  )

}
