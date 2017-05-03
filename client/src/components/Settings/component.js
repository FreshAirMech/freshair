import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import authFunctions from 'lib/functions/authentication';

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

    if (form === 'password' && reenterNewPassword === '') return null;
    if (form === 'email' && reenterNewEmail === '') return null;
    if (reenterEmailDirty || reenterPasswordDirty) {
      if (form === 'email' && newEmail === reenterNewEmail ||
          form === 'password' && newPassword === reenterNewPassword) 
        return 'success';
      return 'error';
    }
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
    if (form === 'password') {
      return oldPassword && newPassword && reenterNewPassword && newPassword === reenterNewPassword
      && authFunctions.isPasswordValid(newPassword) && this.checkValidationState('password');
    }
  }

  render() {
    const { email, isFetching, error, phone } = this.props;
    const { oldPassword, newPassword, reenterNewPassword,
            newEmail, reenterNewEmail, newPhone, phoneFormDirty } = this.state;
    let validPassword = authFunctions.isPasswordValid(newPassword),
        doPasswordsMatch = this.checkValidationState('password'),
        doEmailsMatch = this.checkValidationState('email');
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
                  <ControlLabel>Old Password</ControlLabel>
                  <FormControl
                    name="oldPassword"
                    type="password"
                    value={ oldPassword }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup
                  validationState={ newPassword ? (validPassword ? 'success' : 'error') : null}
                >
                  <ControlLabel>New Password</ControlLabel>
                  <FormControl
                    name="newPassword"
                    type="password"
                    value={ newPassword }
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  {
                    (!validPassword && newPassword) && 
                    <HelpBlock>
                      Enter a new password between 7-14 characters, with
                      at least one capital letter and at least one number.
                    </HelpBlock>
                  }
                </FormGroup>

                <FormGroup
                  validationState={ doPasswordsMatch }
                >
                  <ControlLabel>Re-enter New Password</ControlLabel>
                  <FormControl
                    name="reenterNewPassword"
                    type="password"
                    value={ reenterNewPassword }
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  {
                    (doPasswordsMatch === 'error' && reenterNewPassword) && <HelpBlock>Re-enter new password correctly.</HelpBlock>
                  }
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
                  <ControlLabel>Phone Number (10 digits, no formatting)</ControlLabel>
                  <FormControl
                    name="newPhone"
                    type="text"
                    maxLength={10}
                    value={ phoneFormDirty ? newPhone : (phone || '') }
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
                  <ControlLabel>New Email Address</ControlLabel>
                  <FormControl
                    name="newEmail"
                    type="email"
                    value={ newEmail }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup
                  validationState={ doEmailsMatch }
                >
                  <ControlLabel>Re-enter New Email</ControlLabel>
                  <FormControl
                    name="reenterNewEmail"
                    type="email"
                    value={ reenterNewEmail }
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  {
                    (doEmailsMatch === 'error' && reenterNewEmail) && <HelpBlock>Re-enter new email correctly.</HelpBlock>
                  }
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