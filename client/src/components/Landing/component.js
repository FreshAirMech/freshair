import React, { Component } from 'react';
import { Col } from 'react-bootstrap/lib';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Col md={12}>
          <img id="banner" src={require('../../lib/images/landing.png')} alt="FRESH AIR" />
        </Col>
        <Col md={12} id="why">
          <Col md={12}>
            <h2> Why Others Choose FRESH AIR</h2>
            <hr></hr>
          </Col>
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
        </Col>
      </div>  
    );
  }
}