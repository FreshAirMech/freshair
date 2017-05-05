import React, { Component } from 'react';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPasswordValid, isPhoneNumber } from 'lib/functions/authentication';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      reenterPassword: '',
      reenterDirty: false,
      firstName: '',
      lastName: '',
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
    const { username, password, reenterPassword, email, phone, firstName, lastName } = this.state;
    const { requestSignUp } = this.props;

    e.preventDefault();

    requestSignUp({
      username,
      password,
      reenterPassword,
      firstName,
      lastName,
      email,
      phone
    });
  }

  isPhoneNumberValidationState() {
    const { phone } = this.state;
    const validPhoneNumber = isPhoneNumber(phone);
    return validPhoneNumber ? 'success' :
           ((phone.length === 0) ? null : 'error');
  }

  checkValidationState() {
    const { username, password, reenterPassword, reenterDirty } = this.state;

    if (reenterDirty) {
      if (password && reenterPassword && password === reenterPassword) {
        return 'success';
      }
      if (reenterPassword === '') return null;
      return 'error';
    }
  }

  checkFormIsValid() {
    const { username, password, reenterPassword, reenterDirty, firstName, lastName, email, phone } = this.state;
    return username && password === reenterPassword && reenterDirty && email && firstName && lastName
    && phone && isPhoneNumber(phone) && isPasswordValid(password) && this.checkValidationState();
  }

  render() {
    const { username, password, reenterPassword, firstName, lastName, reenterDirty, email, phone } = this.state;
    const { isFetching, error } = this.props;
    let validPassword = isPasswordValid(password), doPasswordsMatch = this.checkValidationState();
    return (
      <div className="signupPanel">
        <Panel>
          <h3>Sign Up</h3>
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

            <FormGroup validationState={ doPasswordsMatch }
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

            <FormGroup className="name-form">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                name="firstName"
                type="text"
                value={ firstName }
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup className="name-form" id="lastName-form">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                name="lastName"
                type="text"
                value={ lastName }
                onChange={this.handleChange}
              />
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

            <FormGroup validationState={ this.isPhoneNumberValidationState() }>
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