import React, { Component } from 'react';
import { Col, Row, Panel } from 'react-bootstrap/lib';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Row className="settings-div">
          <h1>Settings</h1>
        </Row>
        <Row>
          <Col sm={4}>
            <Panel>
              <h3>Update Photo</h3>
            </Panel>
          </Col>
          <Col sm={4}>
            <Panel>
              <h3>Update Photo</h3>
            </Panel>
          </Col>
          <Col sm={4}>
            <Panel>
              <h3>Update Photo</h3>
            </Panel>
          </Col>
        </Row>
      </div>  
    );
  }
}