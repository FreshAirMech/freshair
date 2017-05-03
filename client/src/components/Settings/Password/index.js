import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import authFunctions from 'lib/functions/authentication';

export default (props) => {
	let { isFetchingPassword, errorPassword, oldPassword, savedPassword,
					newPassword, reenterNewPassword, doPasswordsMatch, validPassword,
					submitPasswordForm, handleChange, checkFormIsValid } = props;
	return (
		<Panel>
		  <h3>Reset Password</h3>

		  <Form onSubmit={submitPasswordForm}>
		    <FormGroup>
		      <ControlLabel>Old Password</ControlLabel>
		      <FormControl
		        name="oldPassword"
		        type="password"
		        value={oldPassword}
		        onChange={handleChange}
		      />
		    </FormGroup>

		    <FormGroup
		      validationState={ newPassword ? (validPassword ? 'success' : 'error') : null}
		    >
		      <ControlLabel>New Password</ControlLabel>
		      <FormControl
		        name="newPassword"
		        type="password"
		        value={newPassword}
		        onChange={handleChange}
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
		        value={reenterNewPassword}
		        onChange={handleChange}
		      />
		      <FormControl.Feedback />
		      {
		        (doPasswordsMatch === 'error' && reenterNewPassword) && <HelpBlock>Re-enter new password correctly.</HelpBlock>
		      }
		    </FormGroup>

		    <FormGroup validationState="error" className="auth-form-error">
		      <Button type="submit" disabled={ !checkFormIsValid('password') } bsStyle="success">
		        { isFetchingPassword ? <Spinner /> : 'Confirm Password Changes' }
		      </Button>
		      {
		        (savedPassword && !errorPassword) && <ControlLabel className="auth-form-message-success">Saved!</ControlLabel>
		      }
		      {
		        (!isFetchingPassword && errorPassword) && <ControlLabel className="auth-form-message-error">{ errorPassword.message }</ControlLabel>
		      }
		    </FormGroup>

		  </Form>
		</Panel>
	);
}