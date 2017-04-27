import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Row>
          <img id="banner" src={require('../../lib/images/landing.png')} alt="FRESH AIR" />
        </Row>
        <Row id="why" className="landing-div">
          <Row>
            <h2>Why Others Choose FRESH AIR</h2>
            <hr></hr>
          </Row>
          <Col sm={4}>
            <h2><i className="fa fa-check-square-o fa-lg" aria-hidden="true"></i>  Reliability</h2>
            <p>Once a deal is confirmed, customers can rest easy knowing that the job will be done correctly.</p>
          </Col>
          <Col sm={4}>
            <h2><i className="fa fa-flash fa-lg" aria-hidden="true"></i>  Efficiency</h2>
            <p>Requests for installation and maintenance are fulfilled as quickly and efficiently as possible.</p>
          </Col>
          <Col sm={4}>
            <h2><i className="fa fa-user-o fa-lg" aria-hidden="true"></i>  Serviceability</h2>
            <p>We ensure caring and thoughtful customer service so that no issue is overlooked.</p>
          </Col>
        </Row>
        <Row id="services" className="landing-div">
          <Row>
            <h2>Examples of Services</h2>
            <hr></hr>
          </Row>
        </Row>
      </div>  
    );
  }
}