import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import SetGoogleMap from 'lib/Map';
import EmailForm from './EmailForm';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    scroll.scrollToTop({duration: 1});
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
          <Col md={4}>
            <div className="team">
              <img src={require('lib/images/pic1.png')}></img>
              <div className="team-name">Kenny Rim</div>
              <div className="team-role">FOUNDER, CEO, BUSINESSMAN, ELECTRICAL & MECHANICAL ENGINEER</div>
              <p className="team-description">Kenny founded Fresh Air in 1989 as a sole proprietorship. Using his Bachelor's degree
                                              in Electrical Engineering from Korea's prestigious Kyonggi University as well as his
                                              work experience in Mechanical Engineering, he used the best practices in both to run
                                              our business single-handedly.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="team">
              <img src={require('lib/images/pic2.png')}></img>
              <div className="team-name">Jonathan Rim</div>
              <div className="team-role">SOFTWARE ENGINEER</div>
              <p className="team-description">Jonathan built our website and ensures that everything runs smoothly on both the front-end
                                              and back-end. He handles everything web related for our company. He graduated from New
                                              York City's Fullstack Academy, a software engineering academy that is rapidly rising in
                                              prestige. He graduated from the University of Michigan with a Computer Engineering degree
                                              in 2015.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="team">
              <img src={require('lib/images/pic1.png')}></img>
              <div className="team-name">Other Staff</div>
              <div className="team-role">TECHNICIAN TEAM</div>
              <p className="team-description">Our team of 8 technicians are sent out to different sites of our clients, 
                                              where the most urgent need is given priority in our queue.</p>
              <div className="team-role">BUSINESS TEAM</div>
              <p className="team-description">Our team of 2 in business are responsible for management and interaction 
                                              between our company and our clients.</p>
            </div>
          </Col>
        </Row>
        <Row id="contact" className="standard-div">
          <Col sm={6}>
            <h2>Contact Us</h2>
            <ul>
              <Row>
                <Col sm={3}>
                  <li>
                    <p>Location:</p>
                  </li>
                </Col>
                <Col sm={6}>
                  <p>59-58 56th Ave</p>
                  <p>Maspeth, NY 11378</p>
                </Col>
              </Row>
              <Row>
                <Col sm={1}>
                  <li>
                    <p>Tel:</p>
                  </li>
                </Col>
                <Col sm={6}>
                  <p>(347) 612-4006</p>
                </Col>
              </Row>
              <Row>
                <Col sm={1}>
                  <li>
                    <p>Fax:</p>
                  </li>
                </Col>
                <Col sm={6}>
                  <p>(718) 456-7090</p>
                </Col>
              </Row>
            </ul>
            <img src={require('lib/images/location.png')}></img>
          </Col>
          <Col sm={6} className="email-col">
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