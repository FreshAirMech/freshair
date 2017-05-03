import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPasswordValid, isPhoneNumber } from 'lib/functions/authentication';
import PasswordSettings from './Password';
import PhoneSettings from './Phone';
import EmailSettings from './Email';

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
      phoneFormDirty: false,
      savedPassword: false,
      savedPhone: false,
      savedEmail: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPasswordForm = this.submitPasswordForm.bind(this);
    this.submitPhoneForm = this.submitPhoneForm.bind(this);
    this.submitEmailForm = this.submitEmailForm.bind(this);
    this.checkFormIsValid = this.checkFormIsValid.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'reenterNewPassword' && !this.state.reenterPasswordDirty) {
      this.setState({
        reenterPasswordDirty: true,
        savedPassword: false
      });
    }
    if (e.target.name === 'newPassword' || e.target.name === 'oldPassword') {
      this.setState({
        savedPassword: false
      });
    }
    if (e.target.name === 'reenterNewEmail' && !this.state.reenterEmailDirty) {
      this.setState({
        reenterEmailDirty: true,
        savedEmail: false
      });
    }
    if (e.target.name === 'newEmail') {
      this.setState({
        savedEmail: false
      });
    }
    if (e.target.name === 'newPhone' && !this.state.phoneFormDirty) {
      this.setState({
        phoneFormDirty: true,
        savedPhone: false
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
      reenterNewPassword: '',
      savedPassword: true
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

    this.setState({
      savedPhone: true
    })

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
      reenterNewEmail: '',
      savedEmail: true
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

  checkFormIsValid(form) {
    const { newEmail, reenterNewEmail, oldPassword, newPassword, reenterNewPassword } = this.state;
    const { email } = this.props;
    
    if (form === 'email')
      return newEmail && reenterNewEmail && newEmail === reenterNewEmail && newEmail !== email;
    if (form === 'password') {
      return oldPassword && newPassword && reenterNewPassword && newPassword === reenterNewPassword
      && isPasswordValid(newPassword) && this.checkValidationState('password');
    }
  }

  render() {
    const { email, phone,
            isFetchingEmail, errorEmail,
            isFetchingPhone, errorPhone,
            isFetchingPassword, errorPassword } = this.props;
    const { oldPassword, newPassword, reenterNewPassword,
            newEmail, reenterNewEmail, newPhone, phoneFormDirty,
            savedPassword, savedEmail, savedPhone } = this.state;
    let validPassword = isPasswordValid(newPassword),
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
            <PasswordSettings 
              isFetchingPassword={isFetchingPassword}
              errorPassword={errorPassword}
              oldPassword={oldPassword}
              newPassword={newPassword}
              reenterNewPassword={reenterNewPassword}
              doPasswordsMatch={doPasswordsMatch}
              validPassword={validPassword}
              submitPasswordForm={this.submitPasswordForm}
              handleChange={this.handleChange}
              checkFormIsValid={this.checkFormIsValid}
              savedPassword={savedPassword}
            />
          </Col>
        </Row>
        <Row className="settings-row">
          <Col sm={6}>
            <PhoneSettings
              submitPhoneForm={this.submitPhoneForm}
              handleChange={this.handleChange}
              newPhone={newPhone}
              phone={phone}
              phoneFormDirty={phoneFormDirty}
              isFetchingPhone={isFetchingPhone}
              errorPhone={errorPhone}
              savedPhone={savedPhone}
            />
          </Col>
          <Col sm={6}>
            <EmailSettings
              submitEmailForm={this.submitEmailForm}
              handleChange={this.handleChange}
              checkFormIsValid={this.checkFormIsValid}
              email={email}
              newEmail={newEmail}
              reenterNewEmail={reenterNewEmail}
              doEmailsMatch={doEmailsMatch}
              isFetchingEmail={isFetchingEmail}
              errorEmail={errorEmail}
              savedEmail={savedEmail}
            />
          </Col>
        </Row>
      </div>  
    );
  }
}