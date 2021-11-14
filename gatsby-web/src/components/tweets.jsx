import * as React from "react"
import { Row, Col } from "react-bootstrap"
import { Tweet } from 'react-twitter-widgets'


export default function Tweets(props) {

  return (
    <Row>
      <Col>
          <h3>Tweets</h3>
          {props.tweets && props.tweets.map(tweet => tweet.mostPopularTweet && <Tweet tweetId={tweet.mostPopularTweet}/>)}
      </Col>
    </Row>

  )

}
