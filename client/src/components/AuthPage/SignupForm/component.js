import React, { Component } from 'react';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      reenterPassword: '',
      reenterDirty: false

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
    const { username, password, reenterPassword } = this.state;
    const { requestSignUp } = this.props;

    e.preventDefault();

    requestSignUp({
      username,
      password,
      reenterPassword
    });
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
    const { username, password, reenterPassword, reenterDirty } = this.state;
    return username && password === reenterPassword && reenterDirty;
  }

  render() {
    const { username, password, reenterPassword, reenterDirty } = this.state;
    const { isFetching, error } = this.props;

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

            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                name="password"
                type="password"
                value={ password }
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup validationState={ this.checkValidationState() }>
              <ControlLabel>Re-enter Password</ControlLabel>
              <FormControl
                name="reenterPassword"
                type="password"
                value={ reenterPassword }
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