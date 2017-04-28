import React, { Component, PropTypes } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import './index.css';

export default class AuthPage extends Component {

  render() {
    return (
      <div className="container" id="auth-container">
        <LoginForm />
        <SignUpForm />
      </div>
    );
  }
}