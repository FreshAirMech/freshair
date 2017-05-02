import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      reenterNewEmail: '',
      reenterDirty: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitUpdateForm = this.submitUpdateForm.bind(this);
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

  submitUpdateForm(e) {
    const { newEmail, reenterNewEmail } = this.state;
    const { requestCheckInfo, username, email } = this.props;

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

  checkFormIsValid() {
    const { newEmail, reenterNewEmail } = this.state;
    const { email } = this.props;
    return newEmail === reenterNewEmail && newEmail !== email;
  }

  render() {
    const { email, isFetching, error } = this.props;
    const { newEmail, reenterNewEmail } = this.state;
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
            </Panel>
          </Col>
          <Col sm={6}>
            <Panel>
              <h3>Update Email Address</h3>
              <label>Current Email Address</label>
              <p>{email}</p>

              <Form onSubmit={this.submitUpdateForm}>
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
                  <Button type="submit" disabled={ !this.checkFormIsValid() } bsStyle="success">
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