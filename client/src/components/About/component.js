import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import SetGoogleMap from 'lib/Map';
import EmailForm from 'lib/EmailForm';

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
              <p className="team-description">Kenny founded Fresh Air in 1981 as a sole proprietorship. Using his Bachelor's degree
                                              in Electrical Engineering from Korea's prestigious Kyonggi University as well as his
                                              work experience in Mechanical Engineering, he used the best practices in both to run
                                              our business single-handedly.</p>
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
              <p className="team-description">Jonathan built our website and ensures that everything runs smoothly on both the front-end
                                              and back-end. He handles everything web related for our company. He graduated from New
                                              York City's Fullstack Academy, a software engineering academy that is rapidly rising in
                                              prestige. He graduated from the University of Michigan with a Computer Engineering degree
                                              in 2015.</p>
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
              <p className="team-description">Our team of 8 technicians are sent out to different sites of our clients, 
                                              where the most urgent need is given priority in our queue.</p>
              <p className="team-role">BUSINESS TEAM</p>
              <p className="team-description">Our team of 2 in business are responsible for management and interaction 
                                              between our company and our clients.</p>
            </Col>
          </Row>
        </Row>
        <Row id="contact" className="standard-div">
          <Col xs={6}>
            <h2>Contact</h2>
            <ul>
              <Row>
                <Col xs={2}>
                  <li>
                    <p>Location:</p>
                  </li>
                </Col>
                <Col xs={6}>
                  <p>59-58 56th Ave</p>
                  <p>Maspeth, NY 11378</p>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <li>
                    <p>Tel:</p>
                  </li>
                </Col>
                <Col xs={6}>
                  <p>(347) 612-4006</p>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <li>
                    <p>Fax:</p>
                  </li>
                </Col>
                <Col xs={6}>
                  <p>(718) 456-7090</p>
                </Col>
              </Row>
            </ul>
          </Col>
          <Col xs={6}>
            <h2>Send us an Email</h2>
            <EmailForm />
          </Col>
          <SetGoogleMap />
        </Row>
        <Row id="copyright" className="standard-div">
          Copyright © 2017, Fresh Air Mechanical Co.
        </Row>
      </div>  
    );
  }
}