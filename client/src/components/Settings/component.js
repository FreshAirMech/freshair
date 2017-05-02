import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      reenterNewEmail: '',
      reenterDirty: false,
      newPhone: this.props.phone || null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPhoneForm = this.submitPhoneForm.bind(this);
    this.submitEmailForm = this.submitEmailForm.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'reenterNewEmail' && !this.state.reenterDirty) {
      this.setState({
        reenterDirty: true
      });
    }

    this.setState({
      [e.target.name]: e.target.value
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

    requestCheckInfo({
      username,
      newEmail,
      reenterNewEmail
    });
  }

  checkValidationState() {
    const { newEmail, reenterNewEmail, reenterDirty } = this.state;
    const { email } = this.props;

    if (reenterDirty) {
      if (newEmail === reenterNewEmail) {
        return 'success';
      }
      return 'error';
    }
    return null;
  }

  checkFormIsValid(form) {
    const { newEmail, reenterNewEmail, newPhone } = this.state;
    const { email } = this.props;
    function isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }
    if (form === 'phone')
      return newPhone && isInt(newPhone) && newPhone.toString().length === 10;
    if (form === 'email')
      return newEmail && reenterNewEmail && newEmail === reenterNewEmail && newEmail !== email;
  }

  render() {
    const { email, isFetching, error } = this.props;
    const { newEmail, reenterNewEmail, newPhone } = this.state;
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
                    type="number"
                    value={ newPhone }
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup validationState="error" className="auth-form-error">
                  <Button type="submit" disabled={ !this.checkFormIsValid('phone') } bsStyle="success">
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

                <FormGroup validationState={ this.checkValidationState() }>
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