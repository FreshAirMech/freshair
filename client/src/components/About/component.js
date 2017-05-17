import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import SetGoogleMap from 'lib/Map';

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
          <Row>
            <h2>Our Team</h2>
          </Row>
          <Row className="team">
            <Col xs={4} md={3}>
              <div className="img-col">
                <img src={require('lib/images/pic1.png')}></img>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <p className="team-name">Kenny Rim</p>
              <p className="team-role">FOUNDER, CEO, BUSINESSMAN, ELECTRICAL & MECHANICAL ENGINEER</p>
              <p className="team-description"></p>
            </Col>
          </Row>
          <Row className="team">
            <Col xs={4} md={3}>
              <div className="img-col">
                <img src={require('lib/images/pic2.png')}></img>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <p className="team-name">Jonathan Rim</p>
              <p className="team-role">SOFTWARE ENGINEER</p>
              <p className="team-description"></p>
            </Col>
          </Row>
          <Row className="team">
            <Col xs={4} md={3}>
              <div className="img-col">
                <img src={require('lib/images/pic1.png')}></img>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <p className="team-name">Other Staff</p>
              <p className="team-role">TECHNICIAN TEAM</p>
              <p className="team-description"></p>
              <p className="team-role">BUSINESS TEAM</p>
              <p className="team-description"></p>
            </Col>
          </Row>
        </Row>
        <Row id="contact" className="standard-div">
          <Col xs={6}>
            <h2>Contact</h2>
            <ul>
              <Row>
                <li>
                  <Col xs={2}>
                    <p>Location:</p>
                  </Col>
                  <Col xs={6}>
                    <p>59-58 56th Ave</p>
                    <p>Maspeth, NY 11378</p>
                  </Col>
                </li>
              </Row>
              <Row>
                <li>
                  <Col xs={1}>
                    <p>Tel:</p>
                  </Col>
                  <Col xs={6}>
                    <p>(347) 612-4006</p>
                  </Col>
                </li>
              </Row>
              <Row>
                <li>
                  <Col xs={1}>
                    <p>Fax:</p>
                  </Col>
                  <Col xs={6}>
                    <p>(718) 456-7090</p>
                  </Col>
                </li>
              </Row>
            </ul>
          </Col>
          <Col xs={6}>
            <SetGoogleMap />
          </Col>
        </Row>
        <Row id="copyright" className="standard-div">
          Copyright © 2017, Fresh Air Mechanical Co.
        </Row>
      </div>  
    );
  }
}