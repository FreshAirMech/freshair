import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      reenterNewEmail: '',
      reenterEmailDirty: false,
      oldPassword: '',
      newPassword: '',
      reenterNewPassword: '',
      reenterPasswordDirty: false,
      newPhone: '',
      phoneFormDirty: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPasswordForm = this.submitPasswordForm.bind(this);
    this.submitPhoneForm = this.submitPhoneForm.bind(this);
    this.submitEmailForm = this.submitEmailForm.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'reenterNewPassword' && !this.state.reenterPasswordDirty) {
      this.setState({
        reenterPasswordDirty: true
      });
    }
    if (e.target.name === 'reenterNewEmail' && !this.state.reenterEmailDirty) {
      this.setState({
        reenterEmailDirty: true
      });
    }
    if (e.target.name === 'newPhone' && !this.state.phoneFormDirty) {
      this.setState({
        phoneFormDirty: true
      })
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitPasswordForm(e) {
    const { oldPassword, newPassword, reenterNewPassword } = this.state;
    const { requestCheckInfo, username } = this.props;

    e.preventDefault();

    this.setState({
      oldPassword: '',
      newPassword: '',
      reenterNewPassword: ''
    })

    requestCheckInfo({
      username,
      oldPassword,
      newPassword,
      reenterNewPassword
    });
  }

  submitPhoneForm(e) {
    const { newPhone } = this.state;
    const { requestCheckInfo, username } = this.props;

    e.preventDefault();

    requestCheckInfo({
      username,
      newPhone
    });
  }

  submitEmailForm(e) {
    const { newEmail, reenterNewEmail } = this.state;
    const { requestCheckInfo, username } = this.props;

    e.preventDefault();

    this.setState({
      newEmail: '',
      reenterNewEmail: ''
    })

    requestCheckInfo({
      username,
      newEmail,
      reenterNewEmail
    });
  }

  checkValidationState(form) {
    const { newEmail, reenterNewEmail, newPassword, reenterNewPassword,
            reenterEmailDirty, reenterPasswordDirty } = this.state;
    const { email } = this.props;

    if (reenterEmailDirty || reenterPasswordDirty) {
      if (form === 'email' && newEmail === reenterNewEmail ||
          form === 'password' && newPassword === reenterNewPassword) 
        return 'success';
      return 'error';
    }
    return null;
  }

  isPhoneNumber() {
    const { newPhone } = this.state;
    if (!newPhone || newPhone.length !== 10) return false;
    for (let i = 0; i < newPhone.length; i++) {
      let digit = newPhone.toString()[i];
      let diff = digit - '0';
      if (isNaN(diff) || diff > 9 || diff < 0) return false;
    }
    return true;
  }

  checkFormIsValid(form) {
    const { newEmail, reenterNewEmail, oldPassword, newPassword, reenterNewPassword } = this.state;
    const { email } = this.props;
    
    if (form === 'email')
      return newEmail && reenterNewEmail && newEmail === reenterNewEmail && newEmail !== email;
    if (form === 'password')
      return oldPassword && newPassword && reenterNewPassword && newPassword === reenterNewPassword;
  }

  render() {
    const { email, isFetching, error, phone } = this.props;
    const { oldPassword, newPassword, reenterNewPassword,
            newEmail, reenterNewEmail, newPhone, phoneFormDirty } = this.state;
    return (
      <div className="settings">
        <Row id="settings-header" className="settings-row">
          <h1>Settings</h1>
        </Row>
        <Row className="settings-row">
          <Col sm={6}>
            <Panel>
              <h3>Update Photo</h3>

            </Panel>
          </Col>
          <Col sm={6}>
            <Panel>
              <h3>Reset Password</h3>

              <Form onSubmit={this.submitPasswordForm}>
                <FormGroup>
                  <ControlLabel><label>Old Password</label></ControlLabel>
                  <FormControl
                    name="oldPassword"
                    type="password"
                    value={ oldPassword }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel><label>New Password</label></ControlLabel>
                  <FormControl
                    name="newPassword"
                    type="password"
                    value={ newPassword }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup validationState={ this.checkValidationState('password') }>
                  <ControlLabel><label>Confirm New Password</label></ControlLabel>
                  <FormControl
                    name="reenterNewPassword"
                    type="password"
                    value={ reenterNewPassword }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup validationState="error" className="auth-form-error">
                  <Button type="submit" disabled={ !this.checkFormIsValid('password') } bsStyle="success">
                    { isFetching ? <Spinner /> : 'Confirm Password Changes' }
                  </Button>
                  {
                    (!isFetching && error) && <ControlLabel className="auth-form-error-message">{ error.message }</ControlLabel>
                  }
                </FormGroup>

              </Form>
            </Panel>
          </Col>
        </Row>
        <Row className="settings-row">
          <Col sm={6}>
            <Panel>
              <h3>Update Phone Settings</h3>

              <Form onSubmit={this.submitPhoneForm}>
                <FormGroup>
                  <ControlLabel><label>Phone Number (10 digits, no formatting)</label></ControlLabel>
                  <FormControl
                    name="newPhone"
                    type="text"
                    maxLength={10}
                    value={ phoneFormDirty ? newPhone : phone }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup validationState="error" className="auth-form-error">
                  <Button type="submit" disabled={ !this.isPhoneNumber() } bsStyle="success">
                    { isFetching ? <Spinner /> : 'Confirm Phone Changes' }
                  </Button>
                  {
                    (!isFetching && error) && <ControlLabel className="auth-form-error-message">{ error.message }</ControlLabel>
                  }
                </FormGroup>

              </Form>
            </Panel>
          </Col>
          <Col sm={6}>
            <Panel>
              <h3>Update Email Address</h3>
              <label>Current Email Address</label>
              <p>{email}</p>

              <Form onSubmit={this.submitEmailForm}>
                <FormGroup>
                  <ControlLabel><label>New Email Address</label></ControlLabel>
                  <FormControl
                    name="newEmail"
                    type="email"
                    value={ newEmail }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup validationState={ this.checkValidationState('email') }>
                  <ControlLabel><label>Confirm New Email</label></ControlLabel>
                  <FormControl
                    name="reenterNewEmail"
                    type="email"
                    value={ reenterNewEmail }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup validationState="error" className="auth-form-error">
                  <Button type="submit" disabled={ !this.checkFormIsValid('email') } bsStyle="success">
                    { isFetching ? <Spinner /> : 'Confirm Email Changes' }
                  </Button>
                  {
                    (!isFetching && error) && <ControlLabel className="auth-form-error-message">{ error.message }</ControlLabel>
                  }
                </FormGroup>

              </Form>
            </Panel>
          </Col>
        </Row>
      </div>  
    );
  }
}