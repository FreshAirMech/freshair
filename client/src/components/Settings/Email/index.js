import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';

export default (props) => {
  let { email, newEmail, reenterNewEmail, submitEmailForm, handleChange,
        checkFormIsValid, doEmailsMatch, isFetchingEmail, errorEmail, savedEmail } = props;
  return (
    <Panel>
      <h3>Update Email Address</h3>
      <label>Current Email Address</label>
      <p>{email}</p>

      <Form onSubmit={submitEmailForm}>
        <FormGroup>
          <ControlLabel>New Email Address</ControlLabel>
          <FormControl
            name="newEmail"
            type="email"
            value={ newEmail }
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <FormControl.Feedback />
          {
            (doEmailsMatch === 'error' && reenterNewEmail) && <HelpBlock>Re-enter new email correctly.</HelpBlock>
          }
        </FormGroup>

        <FormGroup validationState="error" className="auth-form-error">
          <Button type="submit" disabled={ !checkFormIsValid('email') } bsStyle="success">
            { isFetchingEmail ? <Spinner /> : 'Confirm Email Changes' }
          </Button>
          {
            (savedEmail && !isFetchingEmail && !errorEmail) && <ControlLabel className="auth-form-message-success">Saved!</ControlLabel>
          }
          {
            (!isFetchingEmail && errorEmail) && <ControlLabel className="auth-form-message-error">{ errorEmail.message }</ControlLabel>
          }
        </FormGroup>

      </Form>
    </Panel>
  );
}