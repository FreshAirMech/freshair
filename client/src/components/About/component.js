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
        <Row id="about" className="standard-div">
          <Row>
            <h1>About Us</h1>
            <hr></hr>
          </Row>
          <Row>
          </Row>
        </Row>
        <Row id="copyright" className="standard-div">
          Copyright © 2017, Fresh Air Mechanical Co.
        </Row>
      </div>  
    );
  }
}