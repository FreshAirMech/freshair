import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import setGoogleMap from 'lib/Map';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Row id="about" className="standard-div">
          <Row>
            <h1>About Us</h1>
            <hr></hr>
          </Row>
          <Row className="team">
            <Col xs={4} md={3}>
              <div className="img-col">
                <img src={require('lib/images/pic1.png')}></img>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <h4>Kenny Rim</h4>
            </Col>
          </Row>
          <Row className="team">
            <Col xs={4} md={3}>
              <div className="img-col">
                <img src={require('lib/images/pic2.png')}></img>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <h4>Jonathan Rim</h4>
            </Col>
          </Row>
          <Row className="team">
            <Col xs={4} md={3}>
              <div className="img-col">
                <img src={require('lib/images/pic1.png')}></img>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <h4>Other Staff</h4>
            </Col>
          </Row>
        </Row>
        <Row>
          <setGoogleMap />
        </Row>
        <Row id="copyright" className="standard-div">
          Copyright © 2017, Fresh Air Mechanical Co.
        </Row>
      </div>  
    );
  }
}