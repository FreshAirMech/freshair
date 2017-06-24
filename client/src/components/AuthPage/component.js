import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { Col } from 'react-bootstrap/lib';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

export default class AuthPage extends Component {
  componentDidMount() {
    // React 'saves' the current scroll position from the previous view, which is not what we want
    // Scroll back to the very top
    scroll.scrollToTop({duration: 1});
  }
  
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