import React, { Component, PropTypes } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { Col } from 'react-bootstrap/lib';

export default class AuthPage extends Component {

  render() {
    return (
      <div className="container" id="auth-container">
      	<Col xs={12} sm={6}>
        	<LoginForm />
        </Col>
        <Col xs={12} sm={6}>
        	<SignUpForm />
        </Col>
      </div>
    );
  }
}