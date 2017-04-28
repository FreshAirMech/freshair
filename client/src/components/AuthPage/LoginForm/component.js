import React, { Component } from 'react';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitLoginForm(e) {
    e.preventDefault();
    this.props.requestLogin(this.state);
  }

  render() {
    const { username, password } = this.state;
    const { isFetching, error } = this.props;

    return (
      <div className="loginPanel">
        <Panel header="Login" bsStyle="info">
          <Form onSubmit={this.submitLoginForm}>

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

            <FormGroup validationState="error" className="auth-form-error">
              <Button type="submit" bsStyle="info">
                { isFetching ? <Spinner /> : 'Login' }
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