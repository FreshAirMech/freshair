import React, { Component } from 'react';
import { Col } from 'react-bootstrap/lib';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    console.log('rendering')
    return (
      <div className="container-fluid" id="landing">
        <Col sm={12}>
          <p>
            Welcome to Fresh Air
          </p>
        </Col>
        <Col sm={4}>
        </Col>
        <Col sm={8}>
        </Col>
      </div>  
    );
  }
}