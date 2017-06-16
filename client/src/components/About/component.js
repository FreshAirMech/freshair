import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import SetGoogleMap from 'lib/Map';
import EmailForm from './EmailForm';
import Scroll from 'react-scroll';
import $ from 'jquery';
import team from 'lib/objects/team';

var scroll = Scroll.animateScroll;

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // React 'saves' the current scroll position from the previous view, which is not what we want
    // Scroll back to the very top
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
          <Row id="team">
            {
              Object.keys(team).map((key, index) => {
                let member = team[key];
                let id = "member" + (index + 1);
                return (
                  <Col md={4} className="team-member" key={id}>
                      <img src={require('lib/images/pic' + (index + 1) + '.png')}></img>
                      <div className="team-name">{member.name}</div>
                      <div className="team-role">{member.role}</div>
                      <p className="team-description">{member.description}</p>
                      {
                        // For the very last 'team member' (Other staff),
                        // also include an extra role for the business team.
                        (member.role2 && member.description2) && 
                        (
                          <div>
                            <div className="team-role">{member.role2}</div>
                            <p className="team-description">{member.description2}</p>
                          </div>
                        )
                      }
                  </Col>
                );
              })
            }
          </Row>
        </Row>
        <Row id="contact" className="standard-div">
          <Col sm={6}>
            <h2>Contact Us</h2>
            <ul>
              <Row>
                <i className="fa fa-map-marker fa-lg"></i> Address
                <p>59-58 56th Ave <br/>
                Maspeth, NY 11378</p>
              </Row>
              <p />
              <Row>
                <i className="fa fa-phone fa-lg"></i> Phone
                <p>(347) 612-4006</p>
              </Row>
              <p />
              <Row>
                <i className="fa fa-fax fa-lg"></i> Fax
                <p>(718) 456-7090</p>
              </Row>
            </ul>
            <SetGoogleMap />
          </Col>
          <Col sm={6} className="email-col">
            <h2>Send us an Email</h2>
            <EmailForm />
          </Col>
        </Row>
      </div>  
    );
  }
}