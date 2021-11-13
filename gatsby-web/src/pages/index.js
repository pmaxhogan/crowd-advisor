import * as React from "react"
import { Col, Row, Container } from "react-bootstrap"
import NavbarComponent from "../components/navbar"

// markup
const IndexPage = () => {
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
  )
}

export default IndexPage
