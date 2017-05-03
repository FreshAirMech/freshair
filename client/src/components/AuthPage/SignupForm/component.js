import React, { Component } from 'react';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import authFunctions from 'lib/functions/authentication';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      reenterPassword: '',
      reenterDirty: false,
      email: '',
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSignUpForm = this.submitSignUpForm.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'reenterPassword' && !this.state.reenterDirty) {
      this.setState({
        reenterDirty: true
      });
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitSignUpForm(e) {
    const { username, password, reenterPassword, email, phone } = this.state;
    const { requestSignUp } = this.props;

    e.preventDefault();

    requestSignUp({
      username,
      password,
      reenterPassword,
      email,
      phone
    });
  }

  isPhoneNumber(bool) {
    const { phone } = this.state;
    if (phone.length === 0) return bool ? false : null;
    if (phone.length !== 10) return bool ? false : 'error';
    for (let i = 0; i < phone.length; i++) {
      let digit = phone.toString()[i];
      let diff = digit - '0';
      if (isNaN(diff) || diff > 9 || diff < 0) return bool ? false : 'error';
    }
    return bool ? true : 'success';
  }

  checkValidationState() {
    const { username, password, reenterPassword, reenterDirty } = this.state;

    if (reenterDirty) {
      if (password === reenterPassword) {
        return 'success';
      }
      return 'error';
    }
    return null;
  }

  checkFormIsValid() {
    const { username, password, reenterPassword, reenterDirty, email, phone } = this.state;
    return username && password === reenterPassword && reenterDirty && email 
    && phone && this.isPhoneNumber(true);
  }

  render() {
    const { username, password, reenterPassword, reenterDirty, email, phone } = this.state;
    const { isFetching, error } = this.props;
    let validPassword = authFunctions.isPasswordValid(password), doPasswordsMatch = this.checkValidationState();
    return (
      <div className="signupPanel">
        <Panel header="Sign Up" bsStyle="success">
          <Form onSubmit={this.submitSignUpForm}>

            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                name="username"
                type="text"
                value={ username }
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup
              controlId={ validPassword ? 
                              "formValidationSuccess2" :
                              "formValidationError2" }
              validationState={ password ? (validPassword ? 'success' : 'error') : null}
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                name="password"
                type="password"
                value={ password }
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              {
                (!validPassword && password) && 
                <HelpBlock>
                  Enter a password between 7-14 characters, with
                  at least one capital letter and at least one number.
                </HelpBlock>
              }
            </FormGroup>

            <FormGroup 
              controlId={ doPasswordsMatch ? 
                              "formValidationSuccess2" :
                              "formValidationError2" }
              validationState={ doPasswordsMatch }
            >
              <ControlLabel>Re-enter Password</ControlLabel>
              <FormControl
                name="reenterPassword"
                type="password"
                value={ reenterPassword }
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              {
                (doPasswordsMatch === 'error' && reenterPassword) && <HelpBlock>Re-enter password correctly.</HelpBlock>
              }
            </FormGroup>

            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                name="email"
                type="email"
                value={ email }
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup validationState={ this.isPhoneNumber(false) }>
              <ControlLabel>Phone Number (10 digits, no formatting)</ControlLabel>
              <FormControl
                name="phone"
                type="text"
                maxLength={10}
                value={ phone }
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup validationState="error" className="auth-form-error">
              <Button type="submit" disabled={ !this.checkFormIsValid() } bsStyle="success">
                { isFetching ? <Spinner /> : 'Sign Up' }
              </Button>
              {
                (!isFetching && error) && <ControlLabel className="auth-form-error-message">{ error.message }</ControlLabel>
              }
            </FormGroup>

          </Form>
        </Panel>
      </div>
    );
  }
}