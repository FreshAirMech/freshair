import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPhoneNumber } from 'lib/functions/authentication';
import MaskedInput from 'react-maskedinput';

export default (props) => {
  let { submitPhoneForm, handleChange, newPhone, phone,
        phoneFormDirty, isFetchingPhone, errorPhone, savedPhone } = props;
  return (
    <Panel>
      <h3>Update Phone Settings</h3>

      <Form onSubmit={submitPhoneForm}>
        <FormGroup>
          <ControlLabel>Phone Number</ControlLabel>
          <MaskedInput
            className="form-control"
            mask="(111) 111-1111"
            placeholder="(123) 456-7890"
            name="newPhone"
            value={ phoneFormDirty ? newPhone : (phone || '') }
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup validationState="error" className="auth-form-error">
          <Button className="button button-green" type="submit" disabled={ !isPhoneNumber(newPhone) } bsStyle="success">
            { isFetchingPhone ? <Spinner /> : 'Confirm Phone Changes' }
          </Button>
          {
            (savedPhone && !isFetchingPhone && !errorPhone) && <ControlLabel className="auth-form-message-success">Saved!</ControlLabel>
          }
          {
            (!isFetchingPhone && errorPhone) && <ControlLabel className="auth-form-message-error">{ errorPhone.message }</ControlLabel>
          }
        </FormGroup>

      </Form>
    </Panel>
  );
}