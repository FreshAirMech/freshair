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
      <div className="container-fluid" id="landing">
        <img id="banner" src={require('../../lib/images/landing.png')} alt="FRESH AIR" />
        <Col sm={4}>
        </Col>
        <Col sm={8}>
        </Col>
      </div>  
    );
  }
}